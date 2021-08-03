import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const PORT = process.env.PORT;

const server = express();

server.use(express.json());
server.use(cors());

const start = async () => {
    try {
        await mongoose.connect();
        server.listen(PORT, () => console.log('PORT:', PORT));
    } catch (error) {
        console.log(error);
    }
}

start();