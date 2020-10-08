import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { generateRandomCampusReviews, generateRandomMajorReviews } from '../../helpers/generateReviews';
import { useFirebase } from '../Firebase';

import { UserItem } from '../User';
import User from '../User';
import { Campus } from '../Campus';
import { Major } from '../Major';
import { Course } from '../Course';
import AddCampusModal from '../Campus';
import AddMajorModal from '../Major';
import AddCourseModal from '../Course';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const AdminPage = () => {
  const firebase = useFirebase();
  return (
    <Container>
      <h1 className='text-center mt-4 mb-4'>Admin Dashboard</h1>
      <Row className='mb-4'>
        <Col className='text-center'>
          <AddCampusModal />
          <button onClick={() => generateRandomCampusReviews(firebase)}>
            Generate Campuse Reviews
          </button>
        </Col>
        <Col className='text-center'>
          <AddMajorModal />
          <button onClick={() => generateRandomMajorReviews(firebase)}>
            Generate Major Reviews
          </button>
        </Col>
        <Col className='text-center'>
          <AddCourseModal />
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col>
              <Switch>
                <Route
                  exact
                  path={ROUTES.ADMIN_USERS_DETAILS}
                  component={UserItem}
                />
                <Route exact path={ROUTES.ADMIN} component={User} />
              </Switch>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col>
              <Campus />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col>
              <Major title='Complete List of Majors'/>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col>
              <Course />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AdminPage);
