const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const EmailService = require('./Services/EmailService');

const app = express();
const PORT = process.env.PORT || 5000;
const emailService = new EmailService();

dotenv.config({path: `.env`});

app.use(express.json());

app.post('/api/sendemail', async (req, res) => {
    const data = req.body;

    try {
        await emailService.sendEmail(data);
        res.json({message: 'Success!'});
    } catch (e) {
        console.log(e);
        res.json({message: 'Fail!'});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(cors({
    origin: 'http://localhost:3000'
}));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/build")));
  
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "build", "index.html"));
    });
}