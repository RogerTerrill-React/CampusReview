import React from 'react';
import { SignUpLink } from '../SignUp';
import SignInForm from './SignInForm';

const SignInPage = () => {
  return (
    <>
      <h1>Sign In</h1>
      <SignInForm />
      <SignUpLink />
    </>
  );
};

export default SignInPage;
