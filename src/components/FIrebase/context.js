import React, { createContext, useContext } from 'react';
const FirebaseContext = createContext(null);

const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)

const useFirebase = () => {
  return useContext(FirebaseContext);
}

export { withFirebase, useFirebase };
export default FirebaseContext;
