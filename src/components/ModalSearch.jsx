import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { searchModules } from '../services/dictionary_service';
import { Mdl } from './Main';

const Search = ({ value, show, setShow }) => {
    const [resultSearch, setReasult] = useState([]);

    useEffect(async () => {
        const data = await searchModules(value);
        setReasult(data);
    }, []);

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-80w"
            aria-labelledby="search-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="search-modal">
                    Search results
                </Modal.Title>
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