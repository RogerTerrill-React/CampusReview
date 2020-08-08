import React from 'react';
import NavigationAuth from './NavigationAuth';
import NavigationNonAuth from './NavigationNonAuth';
import { AuthUserContext } from '../Session';

const Navigation = () => {
  return (
    <div>
      <AuthUserContext.Consumer>
        {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
      </AuthUserContext.Consumer>
    </div>
  );
};

export default Navigation;
