import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import { useAuthUser } from '../Session';
import { average } from '../../helpers/array';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const AddCourseReviewForm = ({ course, setModalShow, ratings }) => {
  const firebase = useFirebase();
  const authUser = useAuthUser();

  const INITIAL_STATE = {
    score: 0,
    review: '',
    month: '',
    year: ''
  };

  const [values, setValues] = useState(INITIAL_STATE);
  const { month, year, score, review } = values;
  const [snapshot, setSnapshot] = useState(null);

  // Fetch all reviews to calculate new average score
  useEffect(() => {
    setValues({ ...values, loading: true });

    firebase.courseReviews(course.uid).on('value', (snapshot) => {
      const courseReviewsObject = snapshot.val();

      if (courseReviewsObject) {
        const courseReviewsList = Object.keys(courseReviewsObject).map(
          (key) => ({
            ...courseReviewsObject[key],
          })
        );

        let totalScore = 0;
        courseReviewsList.map(
          (review) => (totalScore += parseInt(review.score))
        );
        setValues({
          ...values,
          reviews: courseReviewsList,
        });
      } else {
        setValues({
          ...values,
          reviews: null,
        });
      }
    });
    return () => firebase.courseReviews(course.uid).off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch current campus to set new average score and add new review
  useEffect(() => {
    firebase.course(course.uid).on('value', (snapshot) => {
      const courseSnapshot = snapshot.val();

      if (courseSnapshot) {
        setSnapshot({ ...courseSnapshot });
      } else {
        setSnapshot(null);
      }
    });

    return () => firebase.course(course.uid).off();
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

    // Set new average score for course
    firebase.course(course.uid).set({
      ...snapshot,
      averageScore: Number(avgScore.toFixed(2)),
    });

    // Add new review to course
    firebase.courseReviews(course.uid).push({
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

  const disable = score === '' || review === '' || year === '' || month === '';

  return (
    <Form onSubmit={onSubmit}>
      <Row>
        <Col>
          <Form.Group controlId='forYears'>
            <Form.Label>Session Attended</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  as='select'
                  name='year'
                  value={year}
                  onChange={onChange}
                  type='text'
                >
                  <option>Year Attended</option>
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
                  name='month'
                  value={month}
                  onChange={onChange}
                  type='text'
                >
                  <option>Month Attended</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
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

export default AddCourseReviewForm;
