import Dictionary from '../models/Dictionary.js';

class DictionaryService {
    async getTop5Modules() {
        const data = await Dictionary.find();
        const top5 = data.slice(0, 5);
        return top5;
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

    async searchModules(value) {
        if (value === '') return [];
        const modules = await Dictionary.find();

        const filtredModules = modules.filter(module => {
            const { title, tags } = module;
            if (title.includes(value) || tags.includes(value)) return true;
            return false;
        });
        
        console.log(filtredModules)

        return filtredModules;
    }
}

export default new DictionaryService;