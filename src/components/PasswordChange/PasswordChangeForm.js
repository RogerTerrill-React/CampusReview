import React, { useState } from 'react';
import { useFirebase } from '../Firebase';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const PasswordChangeForm = () => {
  const firebase = useFirebase();
  const history = useHistory();

  const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

  const [values, setValues] = useState(INITIAL_STATE);

  const onSubmit = (event) => {
    const { passwordOne } = values;
    firebase
      .doPasswordUpdate(passwordOne)
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

  const { passwordOne, passwordTwo, error } = values;

  const isInvalid = passwordOne === '' || passwordOne !== passwordTwo;
    
  return (
    <form onSubmit={onSubmit}>
      <input
        name='passwordOne'
        value={passwordOne}
        onChange={onChange}
        type='password'
        placeholder='New Password'
      />
      <input
        name='passwordTwo'
        value={passwordTwo}
        onChange={onChange}
        type='password'
        placeholder='Confirm New Password'
      />
      <button disabled={isInvalid} type='submit'>
        Reset My Password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export default PasswordChangeForm;
