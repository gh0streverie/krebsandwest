const express = require('express');
const router = express.Router();
const multer = require('multer');
const EmailService = require('./Services/EmailService');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const fs = require('fs');
const {BUCKETS} = require('./Utils/Constants');

const emailService = new EmailService();
const upload = multer({ dest: 'uploads/' });

const storage = new Storage({
    projectId: process.env.STORAGE_ID,
    credentials: {
        type: "service_account",
        project_id: "kinetic-guild-411121",
        private_key_id: "50074243982b23742be7e58f767dc56bde4d20a0",
        private_key: process.env.STORAGE_KEY.replace(/\\n/g, '\n').trim(),
        client_email: "462598051861-compute@developer.gserviceaccount.com",
        client_id: "109428912061390333538",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/462598051861-compute%40developer.gserviceaccount.com",
        universe_domain: "googleapis.com"
    }
});

router.post('/sendemail', async (req, res) => {
    const data = req.body;

    try {
        await emailService.sendEmail(data);
        res.json({ message: 'Success!' });
    } catch (e) {
        console.log(e);
        res.json({ message: 'Fail!' });
    }
});

router.post('/sendquestion', async (req, res) => {
    const data = req.body;

    try {
        await emailService.sendQuestion(data);
        res.json({ message: 'Success!' });
    } catch (e) {
        console.log(e);
        res.json({ message: 'Fail!' });
    }
});

router.post('/uploadimages', upload.array('images', 500), async (req, res) => {
    try {
        const uploadedImages = await Promise.all(
            req.files.map(async (file) => {
                const fileName = `${Date.now()}-${file.originalname}`;
                const filePath = path.join(__dirname, file.path);

                await storage.bucket('kandw_weddingpics').upload(filePath, {
                    destination: fileName,
                });

                fs.unlinkSync(filePath);

                return { url: `https://storage.googleapis.com/kandw_weddingpics/${fileName}` };
            })
        );
        res.json(uploadedImages);
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({ error: 'Failed to upload images' });
    }
});

router.get('/getimages', async (req, res) => {
    try {
        // Validate bucket exists
        const { b } = req.query;
        if (!BUCKETS[b]) {
            return res.status(400).json({ error: 'Invalid bucket identifier' });
        }

        let data = [];
        const bucket = storage.bucket(`kandw_${BUCKETS[b]}`);
        
        // Get files from primary bucket
        let [files] = await bucket.getFiles();
        let imageFiles = files
            .filter((file) => /\.(jpg|jpeg|png)$/i.test(file.name))
            .filter((file) => !file.name.includes('_sm'))
            .map((file) => `https://storage.cloud.google.com/kandw_${BUCKETS[b]}/${file.name}`);
        
        data = data.concat(imageFiles);

        // Additional bucket for specific condition
        if (b === "b2bf9a41") {
            const everyoneBucket = storage.bucket(`kandw_a5517c45`);
            let [files] = await everyoneBucket.getFiles();
            let everyoneFiles = files
                .filter((file) => /\.(jpg|jpeg|png)$/i.test(file.name))
                .filter((file) => !file.name.includes('_sm'))
                .map((file) => `https://storage.cloud.google.com/kandw_${BUCKETS["9fb6334c"]}/${file.name}`);

            data = data.concat(everyoneFiles);

            data = data.sort((a, b) => {
                const extractDSCNumber = (url) => {
                    const match = url.match(/DSC\d+/);
                    return match ? parseInt(match[0].replace('DSC', ''), 10) : 0;
                };
            
                const dscA = extractDSCNumber(a);
                const dscB = extractDSCNumber(b);
            
                return dscA - dscB;
            });
        }

        res.json(data);
    } catch (error) {
        console.error('Error fetching image file names:', error);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
});

module.exports = router;