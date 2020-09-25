import React from 'react';
import NavigationAuth from './NavigationAuth';
import NavigationNonAuth from './NavigationNonAuth';
import { useAuthUser } from '../Session';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Navigation = () => {
  const authUser = useAuthUser();

  return (
    <Navbar className='border-bottom'>
      <Navbar.Brand className='mr-auto'>
        <Link to='/'>STEMranks</Link>
      </Navbar.Brand>
      <Nav>
        {authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )}
      </Nav>
    </Navbar>
  );
};

export default Navigation;
