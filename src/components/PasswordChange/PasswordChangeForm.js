import React, { useState } from 'react';
import { useFirebase } from '../Firebase';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
    <Form onSubmit={onSubmit}>
      <Form.Group controlId='formPasswordOne'>
        <Form.Control
          name='passwordOne'
          value={passwordOne}
          onChange={onChange}
          type='text'
          placeholder='New Password'
        />
        <Form.Control
          name='passwordTwo'
          value={passwordTwo}
          onChange={onChange}
          type='text'
          placeholder='ConfirmNew Password'
        />

        <Button
          className='btn-block'
          disabled={isInvalid}
          variant='primary'
          type='submit'
        >
          Change Password
        </Button>
        {error && <p>{error.message}</p>}
      </Form.Group>
    </Form>
  );
};

export default PasswordChangeForm;
