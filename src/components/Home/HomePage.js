import React from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';

const HomePage = () => {
  return <div>Home</div>;
};

const condition = (authUser) => authUser !== null;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
