import React, { useState } from 'react';
import { useFirebase } from '../Firebase';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const PasswordForgetForm = () => {
  const firebase = useFirebase();
  const history = useHistory();

  const INITIAL_STATE = {
    email: '',
    error: null,
  };

  const [values, setValues] = useState(INITIAL_STATE);

  const onSubmit = (event) => {
    const { email } = values;
    firebase
      .doPasswordReset(email)
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

  const { error, email } = values;

  const isInvalid = email === '';

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId='formEmail'>
        <Form.Control
          name='email'
          value={email}
          onChange={onChange}
          type='text'
          placeholder='Email Address'
        />

        <Button
          className='btn-block'
          disabled={isInvalid}
          variant='primary'
          type='submit'
        >
          Forgot Password
        </Button>
        {error && <p>{error.message}</p>}
      </Form.Group>
    </Form>
  );
};

export default PasswordForgetForm;
