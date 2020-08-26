import React from 'react';
import NavigationAuth from './NavigationAuth';
import NavigationNonAuth from './NavigationNonAuth';
import { useAuthUser } from '../Session';

const Navigation = () => {
  const authUser = useAuthUser();
  
  return (
    <div>
      {authUser ? <NavigationAuth authUser={authUser}/> : <NavigationNonAuth />}
    </div>
  );
};

export default Navigation;
