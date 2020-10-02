import React, { useState } from 'react';
import { useFirebase } from '../Firebase';

import { CampusOptionsList } from '../Campus';
import { MajorsOptionsList } from '../Major';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const AddCourseForm = ({ setModalShow }) => {
  const firebase = useFirebase();

  const INITIAL_STATE = {
    name: '',
    code: '',
    units: 0,
    description: '',
    majorId: '',
    schoolId: '',
  };

  const [values, setValues] = useState(INITIAL_STATE);
  const { code, name, units, description, majorId, schoolId } = values;

  const onChange = (event) => {
    // Destructure out name and value from event.target
    const { name, value } = event.target;

    // Spread current values and overwrite with the destructured value
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    firebase.courses().push({
      name,
      code,
      units,
      description,
      majorId,
      schoolId,
      averageScore: 0,
    });

    setValues(INITIAL_STATE);
    setModalShow(false);
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
          placeholder='Enter Course Name'
        />
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col} controlId='formUnit'>
          <Form.Label>Units</Form.Label>
          <Form.Control
            name='units'
            value={units}
            onChange={onChange}
            type='number'
          />
        </Form.Group>

        <Form.Group as={Col} controlId='formCode'>
          <Form.Label>Code</Form.Label>
          <Form.Control
            name='code'
            value={code}
            onChange={onChange}
            type='text'
          />
        </Form.Group>

        <Form.Group as={Col} controlId='formMajorID'>
          <Form.Label>Major</Form.Label>
          <Form.Control
            as='select'
            name='majorId'
            value={majorId}
            onChange={onChange}
          >
            <option>Choose Major</option>
            <MajorsOptionsList />
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId='formMajorID'>
          <Form.Label>School</Form.Label>
          <Form.Control
            as='select'
            name='schoolId'
            value={schoolId}
            onChange={onChange}
          >
            <option>Choose Campus</option>
            <CampusOptionsList />
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Group controlId='formDescription'>
        <Form.Label>Description</Form.Label>
        <Form.Control
        as='textarea'
          name='description'
          value={description}
          onChange={onChange}
          type='text'
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default AddCourseForm;
