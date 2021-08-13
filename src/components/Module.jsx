import React, { useState, useEffect } from 'react';
import '../styles/Module.sass';
import { getModule, addNewWord, deleteWord } from '../services/dictionary_service';

const Module = (props) => {
    const [data, setData] = useState({});
    const [showForm, setStatusForm] = useState(false);

    
    const [en, setEn] = useState('');
    const [ru, setRu] = useState('');


    useEffect(async () => {
        const module = await getModule(props.match.params.id);
        setData(module);
    }, []);

    const addWord = async () => {
        const module = await addNewWord(data._id, en, ru);
        setData(module);
    };

    const renderForm = () => (
        <div className="new-word-form flex">
            <input value={en} onChange={(e) => setEn(e.target.value)} placeholder="word" required />
            <input value={ru} onChange={(e) => setRu(e.target.value)} placeholder="translate" required />
            <i onClick={addWord} className="bi bi-plus-circle"></i>
            <i onClick={() => setStatusForm(false)} className="bi bi-x-circle"></i>
        </div>
    );

    return (
        <div className="flex flex-center module">
            <h1>{data.title}</h1>
            <h3>{data.tags}</h3>
            <p>{data.description}</p>
            <h2>Words:</h2>
            {showForm ? renderForm() : <i onClick={() => setStatusForm(true)} className="bi bi-plus-circle"></i>}
            {!data.words ? null : Object.entries(data.words).map(([en, ru]) => {
                return (
                    <div key={en} className="flex word">
                        <p>{en} - {ru}</p>
                        <i onClick={() => deleteWord(en, data._id)} class="bi bi-trash"></i>
                    </div>
                );
            })}
        </div>
    );
};

export default Module;