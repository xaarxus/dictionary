require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT;

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

server.get('/main.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/public/main.js'));
});

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://salaar:12345@cluster0.5qqg4.mongodb.net/dictionary?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        server.listen(PORT, () => console.log('PORT:', PORT));
    } catch (error) {
        console.log(error);
    }
}

start();