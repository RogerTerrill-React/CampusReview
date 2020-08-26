import React, { useState } from 'react';
import { useFirebase } from '../Firebase';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const SignUpForm = () => {
  const firebase = useFirebase();
  const history = useHistory();

  const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    error: null,
  };

  const [values, setValues] = useState(INITIAL_STATE);

  const onSubmit = (event) => {
    const { username, email, passwordOne, isAdmin } = values;
    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        // Create a user in Firebase realtime databse
        return firebase.user(authUser.user.uid).set({
          username,
          email,
          roles,
        });
      })
      .then(() => firebase.doSendEmailVerification())
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

  const onChangeCheckbox = (event) => {
    // Destructure out name and value from event.target
    const { name, checked } = event.target;

    // Spread current values and overwrite with the destructured value
    setValues({ ...values, [name]: checked });
  };

  const { username, email, passwordOne, passwordTwo, isAdmin } = values;

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
      />
      <input
        name='passwordOne'
        value={passwordOne}
        onChange={onChange}
        type='password'
        placeholder='Password'
      />
      <input
        name='passwordTwo'
        value={passwordTwo}
        onChange={onChange}
        type='password'
        placeholder='Confirm Password'
      />
      <label>
        Admin:
        <input
          name='isAdmin'
          type='checkbox'
          checked={isAdmin}
          onChange={onChangeCheckbox}
        />
      </label>
      <button disabled={isInvalid} type='submit'>
        Sign Up
      </button>
      {values.error && <p>{values.error.message}</p>}
    </form>
  );
};

export default SignUpForm;
