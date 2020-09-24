import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import { Campus, CampusDetails } from '../Campus';
import Container from 'react-bootstrap/Container';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => {
  return (
    <Router>
      <Container>
        <Navigation />
        <hr />
        <Switch>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route path={ROUTES.CAMPUSES} component={Campus} />
          <Route path={ROUTES.CAMPUS_DETAILS} component={CampusDetails} />
        </Switch>
      </Container>
    </Router>
  );
};

export default withAuthentication(App);
