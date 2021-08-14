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
        console.log(id)
        module.words = { ...module.words, [en]: ru };
        await module.save();
        
        const result = await Dictionary.findOne({ _id: id });
        return result;
    }

    async deleteWord(word, id) {
        const module = await Dictionary.findOne({ _id: id });
        const { words } = module;
        const filtred = Object.entries(words).reduce((acc, [en, ru]) => {
            if (en === word) {
                return acc;
            }
            const newAcc = { ...acc, [en]: ru };
            return newAcc;
        }, {});

        module.words = filtred;
        await module.save();
        
        const result = await Dictionary.findOne({ _id: id });
        return result;
    }
}

export default new DictionaryService;