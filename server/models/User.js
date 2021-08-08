import mongoose from 'mongoose';

const User = new mongoose.Schema({
    role: { type: String, default: 'user' },
    nickname: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    accessToken: { type: String },
    refreshToken: { type: String }
});

export default mongoose.model('User', User);