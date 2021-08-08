import { Router } from 'express';
import authController from '../controllers/auth_controller.js';
import auth_middleware from '../middlewares/auth_middleware.js';

const router = new Router();

router.post('/registration', authController.registration);

router.post('/login', authController.login);

//router.post('/logout', authController.logout);

router.get('/activate/:link', authController.activate);

router.get('/refresh', authController.refresh);

router.delete('/delete', auth_middleware, authController.deleteUser);

export default router;