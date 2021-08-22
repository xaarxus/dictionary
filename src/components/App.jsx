import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import { Main } from './Main';
import NotFound from './NotFound';
import Navbar from './Navbar';
import Footer from './Footer';
import Dictionary from './Dictionary';
import Module from './Module';

const App = () => (
  <Router>
    <Navbar />
    <div className="drops">
      <div className="drop" />
      <div className="drop" />
      <div className="drop" />
      <div className="drop" />
      <div className="drop" />
      <div className="drop" />
      <div className="drop" />
      <div className="drop" />
      <div className="drop" />
      <div className="drop" />
      <div className="drop" />
      <div className="drop" />
    </div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/registration" component={Registration} />
      <Route exact path="/dictionary" component={Dictionary} />
      <Route exact path="/dictionary/:id" component={Module} />
      <Route exact path="/" component={Main} />
      <Route component={NotFound} />
    </Switch>
    <Footer />
  </Router>
);

export default App;
