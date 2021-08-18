import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routers/auth_router.js';
import dictionaryRouter from './routers/dictionary_router.js';
import * as path from 'path';

const PORT = process.env.PORT;

const server = express();

server.use(express.json());
server.use(cors());

server.use('/auth', authRouter);
server.use('/dictionary', dictionaryRouter);

server.get('*', (req, res) => {
    if (req.path === '/index.js') {
        return res.sendFile(path.resolve(path.dirname(''), './dist/index.js'));
    }
    res.sendFile(path.resolve(path.dirname(''), './dist/index.html'))
});

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
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