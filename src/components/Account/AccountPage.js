import React from 'react';

import { withAuthorization, useAuthUser } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import { PasswordChangeForm } from '../PasswordChange';

const AccountPage = () => {
  const authUser = useAuthUser();
  return (
    <div>
      <h1>Account: {authUser.email}</h1>
      <PasswordForgetForm />
      <PasswordChangeForm />
    </div>
  );
};

const condition = (authUser) => authUser !== null;

export default withAuthorization(condition)(AccountPage);
