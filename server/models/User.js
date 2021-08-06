const { Schema, model } = require('mongoose');

const User = new Schema({
    role: { type: String, default: 'user' },
    nickname: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    accessToken: { type: String },
    refreshToken: { type: String }
});

module.exports = model('User', User);