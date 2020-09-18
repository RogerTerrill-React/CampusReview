import React, { useState } from 'react';
import { useFirebase } from '../Firebase';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddMajorForm = () => {
  const firebase = useFirebase();

  const INITIAL_STATE = {
    name: '',
    isOnline: false,
    schoolIds: [],
    rating: 0,
  };

  const [values, setValues] = useState(INITIAL_STATE);

  const { name, isOnline, schoolIds } = values;

  const onChange = (event) => {
    // Destructure out name and value from event.target
    const { name, value } = event.target;

    // Spread current values and overwrite with the destructured value
    setValues({ ...values, [name]: value });
  };

  const onSelectChange = (event) => {
    let options = event.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setValues({ ...values, schoolIds: value });
  };

  const onSubmit = (event) => {
    firebase.majors().push({
      name,
      isOnline,
      schoolIds,
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
          placeholder='Enter Major Name'
        />
      </Form.Group>

      <Form.Group controlId='formCampus'>
        <Form.Label>Campus</Form.Label>
        <Form.Control
          as='select'
          name='schoolIds'
          value={schoolIds}
          onChange={onSelectChange}
          multiple
        >
          <option value="csumbValue">CSUMB</option>
          <option>CSUMB2</option>
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
