import React from 'react';
import { compose } from 'recompose';
import {
  withAuthorization,
  withEmailVerification,
  useAuthUser,
} from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import { PasswordChangeForm } from '../PasswordChange';
import Container from 'react-bootstrap/Container';

const AccountPage = () => {
  const authUser = useAuthUser();
  return (
    <Container>
        <h1>Account: {authUser.username}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
    </Container>
  );
};

const condition = (authUser) => authUser !== null;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
