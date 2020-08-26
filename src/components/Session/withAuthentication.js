import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import AuthUserContext from './context';

const withAuthentication = (Component) => {
  const WithAuthentication = (props) => {
    const firebase = useFirebase();
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));

    useEffect(() => {
      const unsubscribe = firebase.onAuthUserListener(
        (authUser) =>{
          localStorage.setItem('authUser', JSON.stringify(authUser));
          setAuthUser(authUser);
        },
        () => setAuthUser(null)
      );
      return () => {
        localStorage.removeItem('authUser');
        unsubscribe();
      }
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
