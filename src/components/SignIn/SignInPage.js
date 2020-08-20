import React from 'react';
import { SignUpLink } from '../SignUp';
import SignInForm from './SignInForm';
import PasswordForgetLink from '../PasswordForget/PasswordForgetLink';

const SignInPage = () => {
  return (
    <>
      <h1>Sign In</h1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </>
  );
};

export default SignInPage;
