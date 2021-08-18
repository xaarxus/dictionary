import React, { useState, useEffect } from 'react';
import { getModule, addNewWord, deleteWord } from '../services/dictionary_service';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return { user: { ...state.user } };
};

const Module = ({ user, match }) => {
    const [data, setData] = useState({});
    const [showForm, setStatusForm] = useState(false);

    const [en, setEn] = useState('');
    const [ru, setRu] = useState('');

    useEffect(async () => {
        const module = await getModule(match.params.id);
        setData(module);
    }, []);

    const addWord = async () => {
        const module = await addNewWord(data._id, en, ru);
        setData(module);
        setEn('');
        setRu('');
    };

    const delWord = (word, id) => async () => {
        const module = await deleteWord(word, id);
        setData(module);
    };

    const renderForm = () => (
        <div className="new-word-form flex">
            <input value={en} onChange={(e) => setEn(e.target.value)} placeholder="word" required />
            <input value={ru} onChange={(e) => setRu(e.target.value)} placeholder="translate" required />
            <div>
                <i onClick={addWord} className="bi bi-plus-circle"></i>
                <i onClick={() => setStatusForm(false)} className="bi bi-x-circle"></i>
            </div>
        </div>
    );

    const btnOpenForm = () => {
        if (showForm) {
            return renderForm();
        }
        return <i onClick={() => setStatusForm(true)} className="bi bi-plus-circle"></i>;
    };

    return (
        <div className="flex flex-center module">
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            <h2>Words:</h2>
            {user.id === data.userId ? btnOpenForm() : null}
            {!data.words ? null : Object.entries(data.words).reverse().map(([en, ru]) => {
                return (
                    <div key={en} className="flex word">
                        <span>{en} - {ru}</span>
                        {user.id === data.userId  ? <i onClick={delWord(en, data._id)} className="bi bi-trash"></i> : null}
                    </div>
                );
            })}
        </div>
    );
};

export default connect(mapStateToProps)(Module);