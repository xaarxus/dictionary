import Dictionary from '../models/Dictionary.js';

class DictionaryService {
    async getAllDictionaries() {
        const data = await Dictionary.find();
        return data;
    }

    async createDictionary(userId, name, tags, description) {
        const dictionary = await Dictionary.create({ userId, name, tags, description });
        return dictionary;
    }
}

export default new DictionaryService;