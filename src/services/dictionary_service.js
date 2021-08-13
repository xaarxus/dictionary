import axios from "axios";

const createModule = async ({ title, tags, descr, userId }) => {
    const res = await axios.post('http://localhost:5000/dictionary/createModule', { title, tags, descr, userId });
    return res.data;
};

const getModules = async (userId) => {
    const res = await axios.post('http://localhost:5000/dictionary/getModules', { userId });
    return res.data;
};

const deleteModule = async (id) => {
    await axios.delete('http://localhost:5000/dictionary/deleteModule', { data: { id } });
};

const getModule = async (id) => {
    const res = await axios.post('http://localhost:5000/dictionary/openModule', { id });
    return res.data;
};

const addNewWord = async (id, en, ru) => {
    const res = await axios.patch('http://localhost:5000/dictionary/addWord', { id, en, ru });
    return res.data;
};

const deleteWord = (word, id) => async () => {
    const res = await axios.patch('http://localhost:5000/dictionary/deleteWord', { id, word });
    return res.data;
};

export {
    createModule,
    getModules,
    getModule,
    deleteModule,
    addNewWord,
    deleteWord
};