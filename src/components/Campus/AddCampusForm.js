import React, { useState } from 'react';
import { useFirebase } from '../Firebase';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddCampusForm = () => {
  const firebase = useFirebase();

  const INITIAL_STATE = {
    name: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    phoneNumber: '',
    url: '',
    about: '',
    rating: 0,
  };

  const [values, setValues] = useState(INITIAL_STATE);

  const {
    name,
    address,
    city,
    state,
    zipcode,
    phoneNumber,
    url,
    about,
  } = values;

  const onChange = (event) => {
    // Destructure out name and value from event.target
    const { name, value } = event.target;

    // Spread current values and overwrite with the destructured value
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    console.log('FIred off');
    firebase.campuses().push({
      name,
      address,
      city,
      state,
      zipcode,
      phoneNumber,
      url,
      about,
    });

    setValues(INITIAL_STATE);
    event.preventDefault();
  };

  return (
    <div>
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
        <Form.Group controlId='formStreet'>
          <Form.Label>Street</Form.Label>
          <Form.Control
            name='address'
            value={address}
            onChange={onChange}
            type='text'
            placeholder='1234 Main St'
          />
        </Form.Group>
        <Form.Group controlId='formCity'>
          <Form.Label>City</Form.Label>
          <Form.Control
            name='city'
            value={city}
            onChange={onChange}
            type='text'
          />
        </Form.Group>
        <Form.Group controlId='formState'>
          <Form.Label>State</Form.Label>
          <Form.Control
            as='select'
            name='state'
            value={state}
            onChange={onChange}
          >
            <option>Choose State</option>
            <option>California</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='formZipcode'>
          <Form.Label>Zip</Form.Label>
          <Form.Control
            name='zipcode'
            value={zipcode}
            onChange={onChange}
            type='text'
          />
        </Form.Group>
        <Form.Group controlId='formPhoneNumber'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            name='phoneNumber'
            value={phoneNumber}
            onChange={onChange}
            type='tel'
            placeholder='Enter Phone Number'
          />
        </Form.Group>
        <Form.Group controlId='formUrl'>
          <Form.Label>Website</Form.Label>
          <Form.Control
            name='url'
            value={url}
            onChange={onChange}
            type='url'
            placeholder='Enter School URL'
          />
        </Form.Group>
        <Form.Group controlId='formAbout'>
          <Form.Label>About</Form.Label>
          <Form.Control
            as='textarea'
            name='about'
            value={about}
            onChange={onChange}
            placeholder='Enter About'
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddCampusForm;
