const express = require('express');
const router = express.Router();
const EmailService = require('./Services/EmailService');

router.get('/', (req, res) => {
    res.send('Hello from the GET route!');
});

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