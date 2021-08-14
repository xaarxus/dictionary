import React, { useState, useEffect } from 'react';
import { Carousel, Card, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getTop5Modules } from '../services/dictionary_service';

const Mdl = ({ _id, title, tags, description }) => {
    return (
        <Card border="primary" style={{ width: '18rem' }} className="mb-2">
            <Card.Header>
                <div className="head-card">
                    {title}
                    <div>
                        <Link to={`/dictionary/${_id}`}><i className="bi bi-book"></i></Link>
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Title>{tags}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    );
};

const MyCarousel = () => {
    return (
        <Carousel fade>
            <Carousel.Item>
                <div className="item-carousel flex flex-center flex-column">
                    <h3>This is a simple dictionary</h3>
                    <p>
                        If you want to add your own words or create your own 
                        module for learning new words,
                    </p>
                    <p>
                        then you need to 
                        <Link className="main-link" to="/login"> login</Link>
                    </p>
                    <p>
                        You can use <Link className="main-link" to="/search">search</Link> to find the dictionary you want
                    </p>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="item-carousel flex flex-center flex-column">
                    <p>Registered users can customize modules for themselves.</p>
                    <Link  className="main-link" to='/registration'>Sing up</Link>
                    <p>and start improving your English every day</p>
                </div>
            </Carousel.Item>
        </Carousel>
    );
}

const Main = () => {
    const [modules, setModules] = useState([]);

    useEffect(async () => {
        const modules = await getTop5Modules();
        setModules(modules);
    }, []);

    return (
        <>
            <div className="h-90vh flex flex-center flex-column">
                <MyCarousel />
                <h6>You can use the previously created modules</h6>
                <CardGroup>
                    {modules.map(({ _id, title, tags, description }) => <Mdl key={_id} _id={_id} title={title} tags={tags} description={description} />)}
                </CardGroup>
            </div>
        </>
    );
};

export default Main;