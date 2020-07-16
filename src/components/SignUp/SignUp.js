import React from 'react';

import SignUpForm from './SignUpForm';
import { FirebaseContext } from '../Firebase';

const SignUp = () => {
  return (
    <>
      <div>SignUp</div>
      <FirebaseContext.Consumer>
        {(firebase) => <SignUpForm firebase={firebase} />}
      </FirebaseContext.Consumer>
    </>
  );
};

export default SignUp;
