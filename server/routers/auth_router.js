import { Router } from 'express';
import authController from '../controllers/auth_controller.js';
import auth_middleware from '../middlewares/auth_middleware.js';

const router = new Router();

router.post('/registration', authController.registration);

router.post('/login', authController.login);

router.get('/activate/:link', authController.activate);

router.get('/refresh', authController.refresh);

export default router;