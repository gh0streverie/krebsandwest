const express = require('express');
const router = express.Router();
const multer = require('multer');
const EmailService = require('./Services/EmailService');
const ImageService = require('./Services/ImageService');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const fs = require('fs');
const { randomUUID } = require('crypto');

const emailService = new EmailService();
// const imageService = new ImageService();
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

module.exports = router;