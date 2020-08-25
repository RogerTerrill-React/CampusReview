import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import AuthUserContext from './context';

const withAuthentication = (Component) => {
  const WithAuthentication = (props) => {
    const firebase = useFirebase();
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
      const unsubscribe = firebase.onAuthUserListener(
        (authUser) => setAuthUser(authUser),
        () => setAuthUser(null)
      );
      return () => unsubscribe();
    }, [firebase]);

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };

  return WithAuthentication;
};

export default withAuthentication;
