import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import { UserList, UserItem } from '../User';
import AddCampusForm from '../Campus';
import AddMajorForm from '../Major';
import AddCourseForm from '../Course';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AdminPage = () => {
  const [campusModalShow, setCampusModalShow] = useState(false);

  return (
    <>
      <h1>Admin</h1>
      <p>The Admin Page is accessible by every signed in admin user.</p>
      <Button variant='primary' onClick={() => setCampusModalShow(true)}>
        Add Campus
      </Button>
      <Modal
        onHide={() => setCampusModalShow(false)}
        show={campusModalShow}
        size='lg'
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Add Campus
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCampusForm />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setCampusModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Switch>
        <Route exact path={ROUTES.ADMIN_USERS_DETAILS} component={UserItem} />
        <Route exact path={ROUTES.ADMIN} component={UserList} />
        <Route exact path={ROUTES.ADD_CAMPUS} component={AddCampusForm} />
        <Route exact path={ROUTES.ADD_MAJOR} component={AddMajorForm} />
        <Route exact path={ROUTES.ADD_COURSE} component={AddCourseForm} />
      </Switch>
    </>
  );
};

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AdminPage);
