import React, { useState, useEffect } from 'react';
import { useFirebase } from  '../Firebase';
import AuthUserContext from './context';

const withAuthentication = (Component) => {
  const WithAuthentication = (props) => {
    const firebase = useFirebase();
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
      const unsubscribe = firebase.auth.onAuthStateChanged((authUser) =>
        authUser ? setAuthUser(authUser) : setAuthUser(null)
      );
      return () => unsubscribe();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };

  return WithAuthentication;
};

export default withAuthentication;