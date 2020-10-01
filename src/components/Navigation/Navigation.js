import React from 'react';
import NavigationAuth from './NavigationAuth';
import NavigationNonAuth from './NavigationNonAuth';
import { useAuthUser } from '../Session';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const Navigation = ({ children }) => {
  const authUser = useAuthUser();

  return (
    <>
      <Navbar variant='dark' fixed='top' expand='sm'>
        <Container>
          <Navbar.Brand className='mr-auto'>
            <Link className='text-light' to='/'>STEMranks</Link>
          </Navbar.Brand>
          <Nav>
            {authUser ? (
              <NavigationAuth authUser={authUser} />
            ) : (
              <NavigationNonAuth />
            )}
          </Nav>
        </Container>
      </Navbar>
      {children}
      <Navbar variant='dark' fixed='bottom'>
        <Container>
          <p className='text-center'>Copyright &copy; STEMranks 2019</p>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
