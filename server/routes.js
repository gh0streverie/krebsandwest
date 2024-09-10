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

function formatPrivateKey(key) {
    const header = '-----BEGIN PRIVATE KEY-----\n';
    const footer = '\n-----END PRIVATE KEY-----\n';
    const content = key.replace(/\\n/g, '\n').trim();
    return `${header}${content}${footer}`;
}

const storage = new Storage({
    projectId: process.env.STORAGE_ID,
    credentials: {
        client_email: process.env.STORAGE_EMAIL,
        private_key: formatPrivateKey(process.env.STORAGE_KEY),
    },
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

router.post('/uploadimages', upload.array('images', 10), async (req, res) => {
    try {
        const uploadedImages = await Promise.all(
            req.files.map(async (file) => {
                const fileName = `${randomUUID}-${file.originalname}`;
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