import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import hero from '../../assets/images/hero.jpg';

const Landing = () => {
  return (
    <>
      <Hero className='d-flex vh-100 cover'>
        <Container fluid>
          <div className='container-fluid text-center'>
            <h1 className='display-4 text-light'>
              Your Education Meets Your Expectation
            </h1>
            <p className='lead pb-4 text-white'>
              Students helping future students.
            </p>
            <Link to='/home'>
              <Button>Learn More</Button>
            </Link>
          </div>
        </Container>
      </Hero>
    </>
  );
};

export default Landing;

const Hero = styled.section`
  min-height: calc(100vh - 62px);
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(43, 43, 43, 0)),
    url(${hero}) center/cover no-repeat;
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
