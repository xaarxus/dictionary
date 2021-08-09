import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
    return (
        <>
            <div className="h-90vh flex flex-center flex-column">
                <MyCarousel />
                <h6>You can use the previously created modules</h6>
            </div>
        </>
    );
};

export default Main;