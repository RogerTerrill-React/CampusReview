import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import Nav from 'react-bootstrap/Nav';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const NavigationAuth = ({ authUser }) => {
  return (
    <>
      <Nav.Link as={Link} className='text-light' to={ROUTES.HOME}>
        Home
      </Nav.Link>

      <Nav.Link as={Link} className='text-light' to={ROUTES.ACCOUNT}>
        Account
      </Nav.Link>

      {!!authUser.roles[ROLES.ADMIN] && (
        <Nav.Link as={Link} className='text-light' to={ROUTES.ADMIN}>
          Admin
        </Nav.Link>
      )}

      <Nav.Link className='text-light'>
        <SignOutButton />
      </Nav.Link>
    </>
  );
};

export default NavigationAuth;
