import React from 'react';
import '../styles/index.sass';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import Main from './Main';
import NotFound from './NotFound';
import Navbar from './Navbar';
import Footer from './Footer';
import Dictionary from './Dictionary';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registration" component={Registration} />
                <Route exact path="/dictionary" component={Dictionary} />
                <Route exact path="/" component={Main} />
                <Route component={NotFound} />
            </Switch>
            <Footer />
        </Router>
    );
};

export default App;