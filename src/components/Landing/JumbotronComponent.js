import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

const JumbotronComponent = () => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <div class='container-fluid text-center'>
            <h1 class='display-4'>The Best Solution for Your College Search</h1>
            <p class='lead pb-4'>
              
            </p>
            <p>
              <a href='#' class='btn btn-primary btn-lg' role='button'>
                Learn More
              </a>
            </p>
          </div>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default JumbotronComponent;
