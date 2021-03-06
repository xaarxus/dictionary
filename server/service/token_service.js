import jwt from 'jsonwebtoken';

class TokenService {
    /*validateToken(token, type = 'access') {
        if (type === 'access') {
            try {
                const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
                return userData;
            } catch (err) {
                return null;
            }
        }
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    }*/

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        };
    }
}

export default new TokenService;