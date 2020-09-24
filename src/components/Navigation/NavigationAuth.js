import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import Nav from 'react-bootstrap/Nav';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const NavigationAuth = ({ authUser }) => {
  return (
    <>
      <Nav.Link as={Link} to={ROUTES.LANDING}>
        Landing
      </Nav.Link>
      <Nav.Link as={Link} to={ROUTES.HOME}>
        Home
      </Nav.Link>
      <Nav.Link as={Link} to={ROUTES.ACCOUNT}>
        Account
      </Nav.Link>

      {!!authUser.roles[ROLES.ADMIN] && (
        <Nav.Link as={Link} to={ROUTES.ADMIN}>
          Admin
        </Nav.Link>
      )}

      <Nav.Link>
        <SignOutButton />
      </Nav.Link>
    </>
  );
};

export default NavigationAuth;
