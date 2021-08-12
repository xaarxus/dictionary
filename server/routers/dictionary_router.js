import { Router } from 'express';
import dictionaryController from '../controllers/dictionary_controller.js';
import auth_middleware from '../middlewares/auth_middleware.js';

const router = new Router();

router.get('/allDictionaries', dictionaryController.getAllDictionaries);

router.post('/createDictionary', dictionaryController.createDictionary);

export default router;