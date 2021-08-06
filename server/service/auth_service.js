const User = require('../models/User');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const mailService = require('./mail_service');
const tokenService = require('./token_service');

class UserService {
    async registration(nickname, email, password) {
        const candidate = await User.findOne({ email });
        if (candidate) {
            return new Error();
        }
        const candidate2 = await User.findOne({ nickname });
        if (candidate2) {
            return new Error();
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
    
        const user = await User.create({ nickname, email, password: hashPassword, activationLink });
        await mailService.sendActivationMail(email, `${process.env.API_URL}auth/activate/${activationLink}`);

        const tokens = tokenService.generateTokens({ user });
        await tokenService.saveToken(nickname, tokens);
    }

    async activate(activationLink) {
        console.log(activationLink)
        const user = await User.findOne({ activationLink });
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            return new Error();
        }
        if (!user.isActivated) {
            return new Error();
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            return new Error();
        }
        const tokens = tokenService.generateTokens({ user });
        await tokenService.saveToken(user.nickname, tokens);
    
        return { ...tokens, user: { email: user.email, name: user.nickname, id: user._id } };
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
    
        return { ...tokens, user: userDto };
    }

    async getAllUsers() {
        const users = await User.find();
        return users;
    }

    async deleteUser(email) {
        await User.deleteOne({ email });
        const users = await User.find();
        return users;
    }

    async setRole(email) {
        const user = await User.findOne({ email });
        user.role = user.role === 'admin' ? 'user' : 'admin';
        user.save();
        const users = await User.find();
        return users;
    }
}

module.exports = new UserService;