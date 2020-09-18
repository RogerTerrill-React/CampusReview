import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import { UserItem } from '../User';
import User from '../User';
import AddCampusModal from '../Campus';
import AddMajorModal from '../Major';

import AddCourseForm from '../Course';

const AdminPage = () => {
  return (
    <>
      <h1>Admin</h1>
      <p>The Admin Page is accessible by every signed in admin user.</p>
      <AddCampusModal />
      <AddMajorModal />
      <Switch>
        <Route exact path={ROUTES.ADMIN_USERS_DETAILS} component={UserItem} />
        <Route exact path={ROUTES.ADMIN} component={User} />
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
