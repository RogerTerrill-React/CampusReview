import React from 'react';
import NavigationAuth from './NavigationAuth';
import NavigationNonAuth from './NavigationNonAuth';
import { useAuthUser } from '../Session';
import { Link, useLocation } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Navigation = ({ children }) => {
  const authUser = useAuthUser();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div style={isLanding ? {} : {'paddingBottom': '100px'}}>
      <Navbar
        variant='dark'
        fixed={isLanding ? 'top' : ''}
        bg={isLanding ? '' : 'dark'}
        expand='sm'
      >
        <Navbar.Brand className='mr-auto'>
          <Link className='text-light font-weight-bold' to='/'>
            STEMranks
          </Link>
        </Navbar.Brand>
        <Nav>
          {authUser ? (
            <NavigationAuth authUser={authUser} isLanding={isLanding} />
          ) : (
            <NavigationNonAuth isLanding={isLanding} />
          )}
        </Nav>
      </Navbar>
      {children}
      <Navbar variant='dark' bg={isLanding ? '' : 'dark'} fixed='bottom'>
        <p className='text-center text-light'>Copyright &copy; STEMranks 2020</p>
      </Navbar>
    </div>
  );
};

export default Navigation;
