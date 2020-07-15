import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const SignUp = () => {
  return <div>SignUp</div>;
};

const SignUpForm = () => {
  const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

  const [values, setValues] = useState(INITIAL_STATE);

  const onSubmit = (event) => {
    console.log(event);
  };

  const onChange = (event) => {
    // Destructure out name and value from event.target
    const { name, value } = event.target;

    // Spread current values and overwrite with new values
    setValues({ ...values, [name]: value });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name='username'
        value={values.username}
        onChange={onChange}
        type='text'
        placeholder='Full Name'
      />
      <input
        name='email'
        value={values.email}
        onChange={onChange}
        type='text'
        placeholder='Email Address'
      />{' '}
      <input
        name='passwordOne'
        value={values.passwordOne}
        onChange={onChange}
        type='password'
        placeholder='Password'
      />{' '}
      <input
        name='passwordTwo'
        value={values.passwordTwo}
        onChange={onChange}
        type='password'
        placeholder='Confirm Password'
      />{' '}
      <button type='submit'>Sign Up</button>
      {values.error && <p>{values.error.message}</p>}
    </form>
  );
};

const SignUpLink = () => {
  return (
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  );
};

export default SignUp;

export { SignUpForm, SignUpLink };
