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
    <Navbar className='border-bottom' bg='light' fixed='top' expand='sm'>
      <Container>
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
      </Container>
    </Navbar>
    {children}
    <footer class="py-3 bg-light fixed-bottom">
   <div class="container">
      <p class="text-center">Copyright &copy; Hello Consultancy 2019</p>
   </div>
</footer>
</>
  );
};

export default Navigation;
