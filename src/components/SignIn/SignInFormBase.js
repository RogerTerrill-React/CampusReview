import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const SignInFormBase = ({ firebase }) => {
  let history = useHistory();

  const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
  };

  const [values, setValues] = useState(INITIAL_STATE);

  const onSubmit = (event) => {
    const { email, password } = values;
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setValues(INITIAL_STATE);
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setValues(error);
      });
    event.preventDefault();
  };

  const onChange = (event) => {
    // Destructure out name and value from event.target
    const { name, value } = event.target;

    // Spread current values and overwrite with the destructured value
    setValues({ ...values, [name]: value });
  };

  const { email, password } = values;

  const isInvalid =
    password === '' ||
    email === '';
    
  return (
    <form onSubmit={onSubmit}>
      <input
        name='email'
        value={email}
        onChange={onChange}
        type='text'
        placeholder='Email Address'
      />
      <input
        name='password'
        value={password}
        onChange={onChange}
        type='password'
        placeholder='Password'
      />
      <button disabled={isInvalid} type='submit'>
        Sign In
      </button>
      {values.error && <p>{values.error.message}</p>}
    </form>
  );
};

export default SignInFormBase;
