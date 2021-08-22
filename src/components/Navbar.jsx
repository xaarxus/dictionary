import React, { useState } from 'react';
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/index';
import ModalSearch from './ModalSearch';

const mapStateToProps = (state) => ({ user: { ...state.user } });

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

  const openSearch = () => {
    setShow(true);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <ModalSearch value={iValue} show={show} setShow={setShow} />
      <Container>
        <Link className="nav-link" to="/">D-E-W</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav className="me-auto">
            <Link className="nav-link" to="/dictionary">Dictionary</Link>
            <>
              <input className="nav-search-input" value={iValue} onChange={handleSearch} />
              <span onClick={openSearch} className="nav-link nav-search"><i className="bi bi-search" /></span>
            </>
          </Nav>
          <Nav>
            <NavDropdown title={user.name || <i className="bi bi-person-circle" />} id="collasible-nav-dropdown">
              {!user.name
                ? <Link className="nav-link-drop" to="/login">Sing In</Link>
                : <Link className="nav-link-drop" onClick={handleLogout} to="/">Logout</Link>}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default connect(mapStateToProps)(MyNavbar);
