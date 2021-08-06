const jwt = require('jsonwebtoken');
const User = require('../models/User');

class TokenService {
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    }

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        };
    }

    async saveToken(nickname, { accessToken, refreshToken }) {
        const user = await User.findOne({ nickname });
        user.refreshToken = refreshToken;
        user.accessToken = accessToken;
        return user.save();
    }

    async removeToken(refreshToken) {
        const user = await User.findOne({ refreshToken });
        user.refreshToken = '';
        user.accessToken = '';
        return user.save();
    }

    async findToken(refreshToken) {
        const tokenData = await User.findOne({ refreshToken });
        return tokenData;
    }
}

module.exports = new TokenService;