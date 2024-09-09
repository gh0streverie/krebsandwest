const express = require('express');
const router = express.Router();
const multer = require('multer');
const EmailService = require('./Services/EmailService');
const ImageService = require('./Services/ImageService');

const emailService = new EmailService();
const imageService = new ImageService();
const upload = multer({ dest: 'uploads/' });

router.post('/sendemail', async (req, res) => {
    const data = req.body;

    try {
        await emailService.sendEmail(data);
        res.json({message: 'Success!'});
    } catch (e) {
        console.log(e);
        res.json({message: 'Fail!'});
    }
});

router.post('/sendquestion', async (req, res) => {
    const data = req.body;

    try {
        await emailService.sendQuestion(data);
        res.json({message: 'Success!'});
    } catch (e) {
        console.log(e);
        res.json({message: 'Fail!'});
    }
});

router.post('/uploadimages', upload.array('images', 10), async (req, res) => {
    const data = req.body;

    try {
        await imageService.saveImage(req.files, res);
        res.json({message: 'Success!'});
    } catch (e) {
        console.log(e);
        res.json({message: 'Fail!'});
    }
});

module.exports = router;