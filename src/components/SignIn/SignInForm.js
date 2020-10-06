import React, { useState } from 'react';
import { useFirebase } from '../Firebase';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignInForm = ({ setModalShow }) => {
  const firebase = useFirebase();
  const history = useHistory();

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
        setValues({ ...values, error });
      });
    event.preventDefault();
    setModalShow(false);
  };

  const onChange = (event) => {
    // Destructure out name and value from event.target
    const { name, value } = event.target;

    // Spread current values and overwrite with the destructured value
    setValues({ ...values, [name]: value });
  };

  const { email, password } = values;

  const isInvalid = password === '' || email === '';

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='formName'>
          <Form.Control
            name='email'
            value={email}
            onChange={onChange}
            type='text'
            placeholder='Email'
          />
        </Form.Group>

        <Form.Group controlId='formPassword'>
          <Form.Control
            name='password'
            value={password}
            onChange={onChange}
            type='password'
            placeholder='Password'
          />
        </Form.Group>

        <Button
          className='btn-block'
          disabled={isInvalid}
          variant='primary'
          type='submit'
        >
          Sign In
        </Button>
        {values.error && <p>{values.error.message}</p>}
      </Form>
    </>
  );
};

export default SignInForm;
