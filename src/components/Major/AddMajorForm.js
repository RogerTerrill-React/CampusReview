import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import { CampusOptionsList }  from '../Campus';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddMajorForm = ({setModalShow}) => {
  const firebase = useFirebase();

  const INITIAL_STATE = {
    name: '',
    code: '',
    isOnline: false,
    schoolIds: [],
    rating: 0,
  };

  const [values, setValues] = useState(INITIAL_STATE);
  const [campuses, setCampuses] = useState([]);

  const { name, code, isOnline, schoolIds } = values;

  const onChange = (event) => {
    // Destructure out name and value from event.target
    const { name, value } = event.target;

    // Spread current values and overwrite with the destructured value
    setValues({ ...values, [name]: value });
  };

  const onSelectChange = (event) => {
    let options = event.target.options;
    let value = [];
    for (let i = 0;  i < options.length; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setValues({ ...values, schoolIds: value });
  };

  const onSubmit = (event) => {
    firebase.majors().push({
      name,
      code,
      isOnline,
      schoolIds,
    });

    setValues(INITIAL_STATE);
    setModalShow(false);
    event.preventDefault();
  };

  useEffect(() => {
    firebase.campuses().on('value', (snapshot) => {
      const campusObject = snapshot.val();

      if(campusObject) {
        const campusList = Object.keys(campusObject).map((key) => ({
          ...campusObject[key],
          uid: key,
        }));
        setCampuses(campusList);
      }
    })
    return () => firebase.campuses().off();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

      <Form.Group controlId='formCampus'>
        <Form.Label>Campus</Form.Label>
        <Form.Control
          as='select'
          name='schoolIds'
          value={schoolIds}
          onChange={onSelectChange}
          multiple
        >
          <CampusOptionsList campuses={campuses}/>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId='formIsOnline'>
        <Form.Check
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
