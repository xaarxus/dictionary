import { Router } from 'express';
import dictionaryController from '../controllers/dictionary_controller.js';
import auth_middleware from '../middlewares/auth_middleware.js';

const router = new Router();

router.get('/getAllModules', dictionaryController.getAllModules);

router.post('/getModules', dictionaryController.getModules);

router.post('/createModule', dictionaryController.createModule);

router.delete('/deleteModule', dictionaryController.deleteModule);

router.post('/openModule', dictionaryController.openModule);

router.patch('/addWord', dictionaryController.addWord);

export default router;