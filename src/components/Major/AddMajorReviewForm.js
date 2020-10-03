import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import { useAuthUser } from '../Session';
import { average } from '../../helpers/array';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const AddMajorReviewForm = ({ campus, major, setModalShow, ratings }) => {
  const firebase = useFirebase();
  const authUser = useAuthUser();

  const INITIAL_STATE = {
    score: 0,
    review: '',
    startYear: '',
    endYear: '',
  };

  const [values, setValues] = useState(INITIAL_STATE);
  const [snapshot, setSnapshot] = useState(null);

  const { startYear, endYear, score, review } = values;

  // Fetch all reviews to calculate new average score
  useEffect(() => {
    setValues({ ...values, loading: true });

    firebase.majorReviews(major.uid).on('value', (snapshot) => {
      const majorReviewsObject = snapshot.val();

      if (majorReviewsObject) {
        const majorReviewsList = Object.keys(majorReviewsObject).map(
          (key) => ({
            ...majorReviewsObject[key],
          })
        );

        let totalScore = 0;
        majorReviewsList.map(
          (review) => (totalScore += parseInt(review.score))
        );
        setValues({
          ...values,
          reviews: majorReviewsList,
        });
      } else {
        setValues({
          ...values,
          reviews: null,
        });
      }
    });
    return () => firebase.majorReviews(major.uid).off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch current campus to set new average score and add new review
  useEffect(() => {
    firebase.major(major.uid).on('value', (snapshot) => {
      const majorSnapshot = snapshot.val();

      if (majorSnapshot) {
        setSnapshot({ ...majorSnapshot });
      } else {
        setSnapshot(null);
      }
    });

    return () => firebase.major(major.uid).off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (event) => {
    // Destructure out name and value from event.target
    const { name, value } = event.target;

    // Spread current values and overwrite with the destructured value
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    ratings.push(parseInt(score));
    const avgScore = average(ratings);

    // Set new average score for major
    firebase.major(major.uid).set({
      ...snapshot,
      averageScore: Number(avgScore.toFixed(2)),
    });

    // Add new review to campus
    firebase.majorReviews(major.uid).push({
      campusUid: campus.uid,
      userId: authUser.uid,
      score: parseInt(score),
      review,
      createdAt: firebase.serverValue.TIMESTAMP,
    });

    // setCount(0);
    setValues(INITIAL_STATE);
    setModalShow(false);
    window.location.reload();
    event.preventDefault();
  };

  const disable = score === '' || review === '' || startYear === '' || endYear === '';

  return (
    <Form onSubmit={onSubmit}>
      <Row>
        <Col>
          <Form.Group controlId='forYears'>
            <Form.Label>Years Attended</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  as='select'
                  name='startYear'
                  value={startYear}
                  onChange={onChange}
                  type='text'
                >
                  <option>Start Year</option>
                  <option>2020</option>
                  <option>2019</option>
                  <option>2018</option>
                  <option>2017</option>
                  <option>2016</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Control
                  as='select'
                  name='endYear'
                  value={endYear}
                  onChange={onChange}
                  type='text'
                >
                  <option>End Year</option>
                  <option>Present</option>
                  <option>2020</option>
                  <option>2019</option>
                  <option>2018</option>
                  <option>2017</option>
                </Form.Control>
              </Col>
            </Row>
          </Form.Group>
        </Col>
        <Col>
          <Row>
            <Col>
              <Form.Group controlId='forScore'>
                <Form.Label>Score</Form.Label>
                <Form.Control
                  as='select'
                  name='score'
                  value={score}
                  onChange={onChange}
                  type='number'
                  placeholder='Enter Score'
                >
                  <option>Please rate...</option>
                  <option>5</option>
                  <option>4</option>
                  <option>3</option>
                  <option>2</option>
                  <option>1</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col>
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
        </Col>
      </Row>

      <Button variant='primary' type='submit' disabled={disable}>
        Submit
      </Button>
    </Form>
  );
};

export default AddMajorReviewForm;
