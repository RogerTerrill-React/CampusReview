import React from "react";
// import { compose } from 'recompose';
// import { withAuthorization, withEmailVerification } from '../Session';
// import Messages from '../Messages';
import { Campus } from "../Campus";
import { Major } from "../Major";
import { Course } from "../Course";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const HomePage = () => {
  return (
    <Container>
      <Row className="mb-4 mt-5">
        <Col>
          <Campus />
        </Col>
      </Row>
      <Row>
        <Col>
          <Major />
        </Col>
        <Col>
          <Course />
        </Col>
      </Row>
      {/* <Messages /> */}
    </Container>
  );
};

// const condition = (authUser) => authUser !== null;

// export default compose(
//   withEmailVerification,
//   withAuthorization(condition)
// )(HomePage);

export default HomePage;
