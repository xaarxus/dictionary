import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="page-404">
            <h1>404 - page not found</h1>
            <p>back to <Link to="/">Home page</Link></p>
        </div>
    );
};

export default NotFound;