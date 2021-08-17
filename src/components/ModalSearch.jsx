import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { searchModules } from '../services/dictionary_service';
import { Mdl } from './Main';

const Search = ({ value, show, setShow }) => {
    const [resultSearch, setReasult] = useState([]);

    useEffect(async () => {
        const data = await searchModules(value);
        setReasult(data);
    }, [value]);

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="search-modal"
        >
            <Modal.Header>
                <Modal.Title id="search-modal">
                    <span>Search results</span>
                </Modal.Title>
                <i onClick={() => setShow(false)} className="bi bi-x"></i>
            </Modal.Header>
            <Modal.Body>
                {resultSearch.length === 0 ? <p>Nothing found</p> :
                    resultSearch.map(module => {
                        const { _id, title, tags, description } = module;
                        return <Mdl key={_id} _id={_id} title={title} tags={tags} description={description} />;
                    })
                }
            </Modal.Body>
        </Modal>
    );
};

export default Search;