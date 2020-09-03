import React, { useEffect } from 'react';
import { useFirebase } from '../Firebase';
import { useAuthUser } from '../Session';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const withAuthorization = (condition) => (Component) => {
  const WithAuthorization = (props) => {
    const firebase = useFirebase();
    const history = useHistory();
    const authUser = useAuthUser();

    useEffect(() => {
      const listener = firebase.onAuthUserListener(
        (authUser) => {
          if (!condition(authUser)) {
            history.push(ROUTES.SIGN_IN);
          }
        },
        () => history.push(ROUTES.SIGN_IN)
      );
      return () => listener();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return condition(authUser) ? <Component {...props} /> : null;
  };
  return WithAuthorization;
};

export default withAuthorization;
