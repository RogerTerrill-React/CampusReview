import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import * as ROUTES from '../../constants/routes';

const NavigationNonAuth = () => {
  return (
    <>
      <Nav.Link as={Link} to={ROUTES.SIGN_IN}>
        Sign In
      </Nav.Link>
      <Nav.Link as={Link} to={ROUTES.SIGN_UP}>
        Sign Up
      </Nav.Link>
    </>
  );
};

export default NavigationNonAuth;
