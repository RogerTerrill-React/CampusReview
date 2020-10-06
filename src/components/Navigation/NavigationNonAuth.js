import React from 'react';
import SignInModal from '../SignIn';
import SignUpModal from '../SignUp';

const NavigationNonAuth = () => {
  return (
    <>
      <SignInModal />
      <SignUpModal />
    </>
  );
};

export default NavigationNonAuth;
