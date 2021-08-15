import axios from "axios";

const createModule = async ({ title, tags, descr, userId }) => {
    const res = await axios.post('https://app-dicti.herokuapp.com//dictionary/createModule', { title, tags, descr, userId });
    return res.data;
};

const getModules = async (userId) => {
    const res = await axios.post('https://app-dicti.herokuapp.com//dictionary/getModules', { userId });
    return res.data;
};

const getTop5Modules = async () => {
    const res = await axios.get('https://app-dicti.herokuapp.com//dictionary/getTop5Modules');
    return res.data;
};

const deleteModule = async (id) => {
    await axios.delete('https://app-dicti.herokuapp.com//dictionary/deleteModule', { data: { id } });
};

const getModule = async (id) => {
    const res = await axios.post('https://app-dicti.herokuapp.com//dictionary/openModule', { id });
    return res.data;
};

const addNewWord = async (id, en, ru) => {
    const res = await axios.patch('https://app-dicti.herokuapp.com//dictionary/addWord', { id, en, ru });
    return res.data;
};

const deleteWord = async (word, id) => {
    const res = await axios.patch('https://app-dicti.herokuapp.com//dictionary/deleteWord', { id, word });
    return res.data;
};

const searchModules = async (value) => {
    const res = await axios.post('https://app-dicti.herokuapp.com//dictionary/searchModules', { value });
    return res.data;
};

export {
    createModule,
    getModules,
    getModule,
    getTop5Modules,
    deleteModule,
    addNewWord,
    deleteWord,
    searchModules
};