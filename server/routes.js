const express = require('express');
const router = express.Router();
const multer = require('multer');
const EmailService = require('./Services/EmailService');
const ImageService = require('./Services/ImageService');

const emailService = new EmailService();
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
        await ImageService.saveImage(req.files);
        res.json({message: 'Success!'});
    } catch (e) {
        console.log(e);
        res.json({message: 'Fail!'});
    }
});

module.exports = router;