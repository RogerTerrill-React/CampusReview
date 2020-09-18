import React, { useState } from 'react';
import { useFirebase } from '../Firebase';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddMajorForm = () => {
  const firebase = useFirebase();

  const INITIAL_STATE = {
    name: '',
    isOnline: false,
    schoolId: '',
    rating: 0,
  };

  const [values, setValues] = useState(INITIAL_STATE);

  const { name, isOnline, schoolId } = values;

  const onChange = (event) => {
    // Destructure out name and value from event.target
    const { name, value } = event.target;

    // Spread current values and overwrite with the destructured value
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    firebase.campuses().push({
      name,
      isOnline,
      schoolId,
    });

    setValues(INITIAL_STATE);
    event.preventDefault();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId='formName'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          name='name'
          value={name}
          onChange={onChange}
          type='text'
          placeholder='Enter School Name'
        />
      </Form.Group>

      <Form.Group controlId='formCampus'>
        <Form.Label>Campus</Form.Label>
        <Form.Control
          as='select'
          name='schoolId'
          value={schoolId}
          onChange={onChange}
        >
          <option>Choose Campus</option>
          <option>CSUMB</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId='formIsOnline'>
        <Form.Check
          required
          name='isOnline'
          label='Available Online'
          onChange={onChange}
          id='validationFormik106'
          feedbackTooltip
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default AddMajorForm;
