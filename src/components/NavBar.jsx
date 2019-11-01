import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import LoginForm from './LoginForm';
import {
  getIsSignedIn,
  login,
  logout,
} from '../store/ducks/session';

function NavBar({ isSignedIn, onLogin, onLogout }) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Attendance</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" />
        {isSignedIn
          ? (
            <Button
              variant="outline-error"
              onClick={onLogout}
            >
              Logout
            </Button>
          )
          : <LoginForm onLogin={onLogin} />}
      </Navbar.Collapse>
    </Navbar>
  );
}

NavBar.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isSignedIn: getIsSignedIn(state),
  };
}

const mapDispatchToProps = {
  onLogin: login,
  onLogout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
