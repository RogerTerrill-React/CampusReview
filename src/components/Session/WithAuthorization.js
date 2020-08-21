import React, { useEffect } from 'react';
import AuthUserContext from './context';

import { useHistory } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const WithAuthorization = (condition) => (Component) => {
  const WithAuthorization = (props) => {
    let history = useHistory();
    useEffect(() => {
      const listener = props.firebase.auth.onAuthStateChanged((authUser) => {
        if (!condition(authUser)) {
          history.push(ROUTES.SIGN_IN);
        }
      });
      return () => listener();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
      <AuthUserContext.Consumer>
        {authUser => condition(authUser) ? <Component {...props} /> : null}
      </AuthUserContext.Consumer>
    ) 
  };
  return withFirebase(WithAuthorization);
};

export default WithAuthorization;
