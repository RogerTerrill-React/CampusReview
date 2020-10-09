import React from 'react';
import { Link } from 'react-router-dom';
import SignInModal from '../SignIn';
import SignUpModal from '../SignUp';
import Nav from 'react-bootstrap/Nav';
import * as ROUTES from '../../constants/routes';



const NavigationNonAuth = () => {
  return (
    <>
    <Nav.Link as={Link} className='text-light' to={ROUTES.HOME}>
        Home
      </Nav.Link>
      <SignInModal />
      <SignUpModal />
    </>
  );
};

export default NavigationNonAuth;
