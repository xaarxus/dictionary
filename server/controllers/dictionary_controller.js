import dictionaryService from '../service/dictionary_service.js';

class DictionaryController {
    async getAllModules(req, res, next) {
        try {
            const data = await dictionaryService.getAllModules();
            res.json(data);
        } catch (err) {
            next(err);
        }
    }

    async getModules(req, res, next) {
        try {
            const { userId } = req.body;
            const data = await dictionaryService.getModules(userId);
            res.json(data);
        } catch (err) {
            next(err);
        }
    }

    async createModule(req, res, next) {
        try {
            const { userId, title, tags, descr } = req.body;
            const module = await dictionaryService.createModule(userId, title, tags, descr);
            res.json(module);
        } catch (err) {
            next(err);
        }
    }

    async deleteModule(req, res, next) {
        try {
            const { id } = req.body;
            const status = await dictionaryService.deleteModule(id);
            res.json({ status });
        } catch (err) {
            next(err);
        }
    }

    async openModule(req, res, next) {
        try {
            const { id } = req.body;
            const module = await dictionaryService.openModule(id);
            res.json(module);
        } catch (err) {
            next(err);
        }
    }

    async addWord(req, res, next) {
        try {
            const { id, en, ru } = req.body;
            console.log(id, en, ru)
            const module = await dictionaryService.addWord(id, en, ru);
            res.json(module);
        } catch (err) {
            next(err);
        }
    }
}

export default new DictionaryController();