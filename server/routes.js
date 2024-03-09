const express = require('express');
const router = express.Router();
const EmailService = require('./Services/EmailService');

const emailService = new EmailService();

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

module.exports = router;