import React from 'react';
import { Campus } from '../Campus';
import JumbotronComponent from './JumbotronComponent';
import Container from 'react-bootstrap/Container';

const Landing = () => {
  return (
    <>
      <JumbotronComponent />
      <Container>
        <Campus />
      </Container>
    </>
  );
};

export default Landing;
