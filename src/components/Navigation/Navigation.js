import React from 'react';
import NavigationAuth from './NavigationAuth';
import NavigationNonAuth from './NavigationNonAuth';
import { useAuthUser } from '../Session';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const Navigation = () => {
  const authUser = useAuthUser();

  return (
    <div>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand>
          <Link to='/'>STEMranks</Link>
        </Navbar.Brand>
        <Nav className='mr-auto'>
          {authUser ? (
            <NavigationAuth authUser={authUser} />
          ) : (
            <NavigationNonAuth />
          )}
        </Nav>
        <Form inline>
          <FormControl type='text' placeholder='Search' className='mr-sm-2' />
          <Button variant='outline-info'>Search</Button>
        </Form>
      </Navbar>
    </div>
  );
};

export default Navigation;
