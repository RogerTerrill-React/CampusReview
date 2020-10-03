import React, { useState } from 'react';
import { useFirebase } from '../Firebase';
import { CampusOptionsList } from '../Campus';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddMajorForm = ({ setModalShow }) => {
  const firebase = useFirebase();

  const INITIAL_STATE = {
    name: '',
    description: '',
    code: '',
    schoolIds: [],
    rating: 0,
  };

  const [values, setValues] = useState(INITIAL_STATE);

  const { name, description, code, schoolIds } = values;

  const onChange = (event) => {
    // Destructure out name and value from event.target
    const { name, value } = event.target;

    // Spread current values and overwrite with the destructured value
    setValues({ ...values, [name]: value });
  };

  const onSelectChange = (event) => {
    const { name } = event.target
    let options = event.target.options;
    let value = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    firebase.majors().push({
      name,
      description,
      code,
      schoolIds,
      averageScore: 0,
    });

    setValues(INITIAL_STATE);
    setModalShow(false);
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

      <Form.Group controlId='formCode'>
        <Form.Label>Code</Form.Label>
        <Form.Control
          name='code'
          value={code}
          onChange={onChange}
          type='text'
          placeholder='Enter Major Name'
        />
      </Form.Group>

      <Form.Group controlId='formDescription'>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as='textarea'
          name='description'
          value={description}
          onChange={onChange}
          type='text'
          placeholder='Enter Major Description'
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
          <CampusOptionsList />
        </Form.Control>
      </Form.Group>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default AddMajorForm;
