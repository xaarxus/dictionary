import React, { useState, useEffect } from 'react';
import '../styles/NavBar.sass';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/index';

const mapStateToProps = (state) => {
    return { user: { ...state.user } };
};

const MyNavbar = ({ user, dispatch }) => {
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Link className='nav-link' to="/">D-E-W</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className='nav-link' to="/dictionary">Dictionary</Link>
                        <Link className='nav-link' to="/search">Search</Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={user.name || 'anonymous'} id="collasible-nav-dropdown">
                            {!user.name ? 
                                <>
                                    <Link className='nav-link-drop' to="/login">Sing In</Link>
                                </> :
                                <>
                                    <Link className='nav-link-drop' to="/settings">Settings</Link>
                                    <NavDropdown.Divider />
                                    <Link className='nav-link-drop' onClick={handleLogout} to="/">Logout</Link>
                                </>
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default connect(mapStateToProps)(MyNavbar);