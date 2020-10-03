import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import { useLocation, useParams } from 'react-router-dom';
import { useAuthUser } from '../Session';

import AddCampusReviewModal from './AddCampusReviewModal';
import { CampusMajorsList } from '../Major';
import CampusInfo from './CampusInfo';
import CampusReviews from './CampusReviews';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const CampusDetails = () => {
  const firebase = useFirebase();
  const params = useParams();
  const location = useLocation();
  const authUser = useAuthUser();

  const INITIAL_STATE = {
    loading: false,
    campus: null,
    reviews: null,
    ...location.state, // location comes from state in Link to
  };

  const [values, setValues] = useState(INITIAL_STATE);

  // Get information on specific campus
  useEffect(() => {
    if (values.campus) {
      return;
    }

    setValues({ ...values, loading: true });

    // params returned through react router Link
    firebase.campus(params.id).on('value', (snapshot) => {
      setValues({
        loading: false,
        campus: snapshot.val(),
      });
    });
    return () => firebase.campus(params.id).off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { campus, loading } = values;

  return (
    <Container>
      <Row>
        <Col>
          <h2 className='text-center mt-3'>{campus.name} </h2>
          {campus.reviewCount ? (
            <h4 className='text-center'>
              Overall score is {campus.averageScore} based on{' '}
              {campus.reviewCount} reviews
            </h4>
          ) : (
              <h2>No reviews yet...</h2>
            )}
          {loading && <div>Loading...</div>}
        </Col>
      </Row>
      <Row>
        <Col>
          <Row className='mb-4'>
            <Col>
              <CampusInfo campus={campus} />
            </Col>
          </Row>
          <Row>
            <Col>
              <CampusMajorsList campus={campus} />
            </Col>
          </Row>
        </Col>
        <Col>
          <CampusReviews campus={campus} />
          {authUser && <AddCampusReviewModal campus={campus} />}
        </Col>
      </Row>
    </Container>
  );
};

export default CampusDetails;
