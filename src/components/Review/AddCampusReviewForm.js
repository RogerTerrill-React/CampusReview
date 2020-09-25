import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import { useAuthUser } from '../Session';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddCampusReviewForm = ({ campus, setModalShow }) => {
  const firebase = useFirebase();
  const authUser = useAuthUser();

  const INITIAL_STATE = {
    score: '',
    review: '',
  };

  const [values, setValues] = useState(INITIAL_STATE);
  const [totalScore, setTotalScore] = useState(0);
  const [count, setCount] = useState(0);
  const [snapshot, setSnapshot] = useState(null);

  const { score, review } = values;

  useEffect(() => {
    setValues({ ...values, loading: true });

    firebase.campusReviews(campus.uid).on('value', (snapshot) => {
      const campusReviewsObject = snapshot.val();

      if (campusReviewsObject) {
        const campusReviewsList = Object.keys(campusReviewsObject).map(
          (key) => ({
            ...campusReviewsObject[key],
          })
        );

        let totalScore = 0;
        campusReviewsList.map(
          (review) => (totalScore += parseInt(review.score))
        );
        setValues({
          ...values,
          reviews: campusReviewsList,
        });
        setCount(campusReviewsList.length);
        setTotalScore(totalScore);
      } else {
        setValues({
          ...values,
          reviews: null,
        });
      }
    });
    return () => firebase.campusReviews(campus.uid).off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    firebase.campus(campus.uid).on('value', (snapshot) => {
      const campusSnapshot = snapshot.val();

      if (campusSnapshot) {
        setSnapshot({ ...campusSnapshot });
      } else {
        setSnapshot(null);
      }
    });

    return () => firebase.campuses(campus.uid).off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (event) => {
    // Destructure out name and value from event.target
    const { name, value } = event.target;

    // Spread current values and overwrite with the destructured value
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    const reviewCount = count + 1;
    const avgScore = (totalScore + parseInt(score)) / reviewCount;

    firebase.campus(campus.uid).set({
      ...snapshot,
      reviewCount,
      averageScore: avgScore.toFixed(2),
    });

    firebase.campusReviews(campus.uid).push({
      userId: authUser.uid,
      score,
      review,
    });

    setCount(0);
    setValues(INITIAL_STATE);
    setModalShow(false);
    event.preventDefault();
  };

  const disable = score === '' || review === '';

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId='forScore'>
        <Form.Label>Score</Form.Label>
        <Form.Control
          as='select'
          name='score'
          value={score}
          onChange={onChange}
          type='text'
          placeholder='Enter Score'
        >
          <option>Please rate...</option>
          <option value='5'>5</option>
          <option value='4'>4</option>
          <option value='3'>3</option>
          <option value='2'>2</option>
          <option value='1'>1</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId='formReview'>
        <Form.Label>Review</Form.Label>
        <Form.Control
          as='textarea'
          name='review'
          value={review}
          onChange={onChange}
          type='text'
          placeholder='Give feedback you wish you had as a new incoming student...'
        />
      </Form.Group>
      <Button variant='primary' type='submit' disabled={disable}>
        Submit
      </Button>
    </Form>
  );
};

export default AddCampusReviewForm;