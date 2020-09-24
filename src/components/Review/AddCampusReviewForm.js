import React, { useState } from 'react';
import { useFirebase } from '../Firebase';
import { useAuthUser } from '../Session';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddCampusReviewForm = ({ campus }) => {
  const firebase = useFirebase();
  const authUser = useAuthUser();

  const INITIAL_STATE = {
    score: '',
    review: '',
  };

  const [values, setValues] = useState(INITIAL_STATE);

  const { score, review } = values;

  const onChange = (event) => {
    // Destructure out name and value from event.target
    const { name, value } = event.target;

    // Spread current values and overwrite with the destructured value
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    firebase.reviews().push({
      userId: authUser.uid,
      campusId: campus.uid,
      score,
      review,
    });

    setValues(INITIAL_STATE);
    event.preventDefault();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId='forScore'>
        <Form.Label>Score</Form.Label>
        <Form.Control
          name='score'
          value={score}
          onChange={onChange}
          type='text'
          placeholder='Enter Score'
        />
      </Form.Group>
      <Form.Group controlId='formReview'>
        <Form.Label>Review</Form.Label>
        <Form.Control
          name='review'
          value={review}
          onChange={onChange}
          type='text'
          placeholder='1234 Main St'
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default AddCampusReviewForm;
