import React from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import Messages from '../Messages';

const HomePage = () => {
  return (
    <>
      <h1>Home</h1>
      <p>The Home Page is accessible by every signed in user.</p>

      <Messages />
    </>
  );
};

const condition = (authUser) => authUser !== null;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
