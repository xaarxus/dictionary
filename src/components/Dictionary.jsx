import React, { useState, useEffect } from 'react';
import '../styles/Dictionary.sass';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Button, Card, CloseButton } from 'react-bootstrap';
import axios from 'axios';

const mapStateToProps = (state) => {
    return { user: { ...state.user } };
};

const renderTags = (str) => {
    const tags = str.split(' ');
    return <div className="flex-wrap flex flex-center" >{tags.map(tag => <span className="span-badge" key={tag}>{tag}</span>)}</div>
};

const Dictionary = ({ user, dispatch }) => {
    //if (!user.name) return <Redirect to="/login" />
    const [showForm, setStatusForm] = useState(false);
    const [modules, setModules] = useState([{id:4, title: 'ssev', tags: 'sdf dsf', description: 'description'},{id:4, title: 'ssev', tags: 'sdf dsf', description: 'description'},{id:4, title: 'ssev', tags: 'sdf dsf', description: 'description'},{id:4, title: 'ssev', tags: 'sdf dsf', description: 'description'},{id:4, title: 'ssev', tags: 'sdf dsf', description: 'description'},{id:4, title: 'ssev', tags: 'sdf dsf', description: 'description description description'},{id:4, title: 'ssev', tags: 'sdf dsf', description: 'description'}]);

    const [inp1, setInp1] = useState('');
    const [inp2, setInp2] = useState('');
    const [inp3, setInp3] = useState('');

    useEffect(() => {

    });

    const handleOpenForm = () => {
        setStatusForm(!showForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/dictionary/addNew', {
            title: inp1, tags: inp2, description: inp3
        });
        setModules((modules) => ([...modules, res.data]));
        setStatusForm(false);
    }

    const renderForm = () => {
        return (<>
            <hr />
                <h3>Create new module</h3>
                <form onSubmit={handleSubmit} className="flex flex-center">
                        <input value={inp1} onChange={(e) => setInp1(e.target.value)} className="input-form-create" placeholder="Module name" required />
                        {inp2 ? renderTags(inp2) : null}
                        <input value={inp2} onChange={(e) => setInp2(e.target.value)} className="input-form-create" placeholder="Tags" required />
                        <textarea value={inp3} onChange={(e) => setInp3(e.target.value)} className="area-form-create" placeholder="Short description" />
                    <button type="submit" className="add-module-btn">Add</button>
                </form>
            <hr />
        </>)
    }

    return (
        <div className="dictionary flex flex-center">
            <div className="flex flex-center">
                <h2>Your modules:</h2>
                <Button onClick={handleOpenForm} className="p-50" variant="light">{showForm ? 'Hide Form' : 'Add New'}</Button>
            </div>
            {showForm ? renderForm() : null}
            {modules.length === 0 ? <h6>You haven't created any modules yet.</h6> :
                <div className="card-items">
                    {modules.map(module => {
                        const { id, title, tags, description } = module;
                        return (
                            <Card key={id} bg="secondary" text="white" style={{ width: '18rem' }} className="mb-2">
                                <Card.Header>
                                    <div className="head-card">
                                        {title}
                                        <div>
                                            <i class="bi bi-book"></i>
                                            <i class="bi bi-x-square"></i>
                                        </div>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>{tags}</Card.Title>
                                    <Card.Text>{description}</Card.Text>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </div>
            }
        </div>
    );
};

export default connect(mapStateToProps)(Dictionary);