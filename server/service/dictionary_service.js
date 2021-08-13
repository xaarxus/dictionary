import Dictionary from '../models/Dictionary.js';

class DictionaryService {
    async getAllModules() {
        const data = await Dictionary.find();
        return data;
    }

    async getModules(userId) {
        const data = await Dictionary.find({ userId });
        return data;
    }

    async createModule(userId, title, tags, description) {
        const module = await Dictionary.create({ userId, title, tags, description, words: {} });
        return module;
    }

    async deleteModule(id) {
        await Dictionary.deleteOne({ _id: id });
        return true;
    }

    async openModule(id) {
        const module = await Dictionary.findOne({ _id: id });
        return module;
    }

    async addWord(id, en, ru) {
        const module = await Dictionary.findOne({ _id: id });
        module.words[en] = ru;
        module.save();
        
        const result = await Dictionary.findOne({ _id: id });
        return result;
    }
}

export default new DictionaryService;