const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path')
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config({path: `.env`});

app.use(express.json());

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'))
});