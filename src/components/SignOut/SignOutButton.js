import React from 'react';
import { useFirebase } from '../Firebase';

const SignOutButton = () => {
  const firebase = useFirebase();
  return (
    <div onClick={firebase.doSignOut}>
      Sign Out
    </div>
  );
};

export default SignOutButton;
