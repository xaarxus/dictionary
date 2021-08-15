import { Router } from 'express';
import dictionaryController from '../controllers/dictionary_controller.js';
//import auth_middleware from '../middlewares/auth_middleware.js';

const router = new Router();

router.get('/getTop5Modules', dictionaryController.getTop5Modules);

router.post('/getModules', dictionaryController.getModules);

router.post('/createModule', dictionaryController.createModule);

router.post('/openModule', dictionaryController.openModule);

router.post('/searchModules', dictionaryController.searchModules);

router.patch('/addWord', dictionaryController.addWord);

router.patch('/deleteWord', dictionaryController.deleteWord);

router.delete('/deleteModule', dictionaryController.deleteModule);

export default router;