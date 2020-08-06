import React from 'react';
import NavigationAuth from './NavigationAuth'
import NavigationNonAuth from './NavigationNonAuth'

const Navigation = ({authUser}) => {

  return (

    <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />} </div>
  );
};

export default Navigation;
