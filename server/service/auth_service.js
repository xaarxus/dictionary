import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import * as uuid from 'uuid';
import mailService from './mail_service.js';
import tokenService from './token_service.js';

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
        return { isCreate: true, message: '' };
    }

    async activate(activationLink) {
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
    
        return { ...tokens, user: { email: user.email, name: user.nickname, id: user._id } };
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

export default new UserService;