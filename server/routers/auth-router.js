const Router = require('express').Router;
const authController = require('../controllers/auth_controller');
const auth_middleware = require('../middlewares/auth_middleware');

const router = new Router();

router.post('/registration', authController.registration);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.get('/activate/:link', authController.activate);

router.get('/refresh', authController.refresh);

router.delete('/delete', auth_middleware, authController.deleteUser);

module.exports = router;