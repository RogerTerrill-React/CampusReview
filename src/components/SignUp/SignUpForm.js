import React, { useState } from 'react';

const SignUpForm = ({ firebase }) => {
  const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

  const [values, setValues] = useState(INITIAL_STATE);

  const onSubmit = (event) => {
    const { email, passwordOne } = values;
    firebase
    .doCreateUserWithEmailAndPassword(email, passwordOne)
    .then((authUser) => {
      setValues(INITIAL_STATE);
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

  const { username, email, passwordOne, passwordTwo } = values;

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';
  return (
    <form onSubmit={onSubmit}>
      <input
        name='username'
        value={username}
        onChange={onChange}
        type='text'
        placeholder='Full Name'
      />
      <input
        name='email'
        value={email}
        onChange={onChange}
        type='text'
        placeholder='Email Address'
      />{' '}
      <input
        name='passwordOne'
        value={passwordOne}
        onChange={onChange}
        type='password'
        placeholder='Password'
      />{' '}
      <input
        name='passwordTwo'
        value={passwordTwo}
        onChange={onChange}
        type='password'
        placeholder='Confirm Password'
      />{' '}
      <button disabled={isInvalid} type='submit'>
        Sign Up
      </button>
      {values.error && <p>{values.error.message}</p>}
    </form>
  );
};

export default SignUpForm;
