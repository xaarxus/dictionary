import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/index';
import ModalSearch from './ModalSearch';

const mapStateToProps = (state) => {
    return { user: { ...state.user } };
};

const MyNavbar = ({ user, dispatch }) => {
    const [show, setShow] = useState(false);
    const [iValue, setIValue] = useState('');

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const handleSearch = (e) => {
        setIValue(e.target.value);
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <ModalSearch value={iValue} show={show} setShow={setShow} />
            <Container>
                <Link className='nav-link' to="/">D-E-W</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <>
                            <input value={iValue} onChange={handleSearch} />
                            <span onClick={() => {setShow(true)}} className='nav-link nav-search'><i className="bi bi-search"></i></span>
                        </>
                    </Nav>
                    <Nav className="me-auto">
                        <Link className='nav-link' to="/dictionary">Dictionary</Link>
                    </Nav>
                    <Nav>
                        <Link className='nav-link theme-link' to="/"><i className="bi bi-sun"></i></Link>
                        <NavDropdown>
                            <NavDropdown.Item>RU</NavDropdown.Item>
                            <NavDropdown.Item>EN</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={user.name || 'anonymous'} id="collasible-nav-dropdown">
                            {!user.name ? 
                                <Link className='nav-link-drop' to="/login">Sing In</Link> :
                                <Link className='nav-link-drop' onClick={handleLogout} to="/">Logout</Link>
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default connect(mapStateToProps)(MyNavbar);