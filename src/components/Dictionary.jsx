import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Button, Card } from 'react-bootstrap';
import { createModule, getModules, deleteModule } from '../services/dictionary_service';

const mapStateToProps = (state) => {
    return { user: { ...state.user } };
};

const renderTags = (str) => {
    const tags = str.split(' ');
    return <div className="flex-wrap flex flex-center" >{tags.map(tag => <span className="span-badge" key={tag}>{tag}</span>)}</div>
};

const Dictionary = ({ user, dispatch }) => {
    if (!user.name) return <Redirect to="/login" />
    const [showForm, setStatusForm] = useState(false);
    const [modules, setModules] = useState([]);

    const [inp1, setInp1] = useState('');
    const [inp2, setInp2] = useState('');
    const [inp3, setInp3] = useState('');

    useEffect(async () => {
        const modulesFromAPI = await getModules(user.id);
        setModules(modulesFromAPI);
    }, []);

    const handleOpenForm = () => {
        setStatusForm(!showForm);
    };

    const delModule = (id) => async () => {
        await deleteModule(id);
        const modulesFromAPI = await getModules(user.id);
        setModules(modulesFromAPI);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newModule = await createModule({ title: inp1, tags: inp2, descr: inp3, userId: user.id })
        setModules((modules) => ([...modules, newModule]));
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
                        const { _id, title, tags, description } = module;
                        return (
                            <Card key={_id} border="primary" style={{ width: '18rem' }} className="mb-2">
                                <Card.Header>
                                    <div className="head-card">
                                        {title}
                                        <div>
                                            <Link to={`/dictionary/${_id}`}><i className="bi bi-book"></i></Link>
                                            <i onClick={delModule(_id)} className="bi bi-x-lg"></i>
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