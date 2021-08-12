import dictionaryService from '../service/dictionary_service.js';

class DictionaryController {
    async getAllDictionaries(req, res, next) {
        try {
            const data = await dictionaryService.getAllDictionaries();
            res.json(data);
        } catch (err) {
            next(err);
        }
    }

    async createDictionary(req, res, next) {
        try {
            const { userId, name, tags, description } = req.body;
            console.log(userId, name, tags, description)
            const dictionary = await dictionaryService.createDictionary(userId, name, tags, description);
            res.json(dictionary);
        } catch (err) {
            next(err);
        }
    }
}

export default new DictionaryController();