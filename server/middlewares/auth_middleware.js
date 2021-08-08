import tokenSer from '../service/token_service.js';

export default (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(new Error());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(new Error());
        }

        const userData = tokenSer.validateAccessToken(accessToken);
        if (!userData) {
            return next(new Error());
        }

        req.user = userData;
        next();
    } catch (err) {
        return next(new Error());
    }
};