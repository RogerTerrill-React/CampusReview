import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import { useLocation, useParams } from 'react-router-dom';

import { CampusMajorsList } from '../Major';
import CampusInfo from './CampusInfo';
import CampusReviews from './CampusReviews';
import { Score } from '../Shared';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const CampusDetails = () => {
  const firebase = useFirebase();
  const params = useParams();
  const location = useLocation();

  const INITIAL_STATE = {
    loading: false,
    campus: null,
    reviews: null,
    ...location.state, // location comes from state in Link to
  };

  const [values, setValues] = useState(INITIAL_STATE);
  const [ratings, setRatings] = useState({ reviewCount: 0, averageScore: 0 });

  // Get information on specific campus
  useEffect(() => {
    if (values.campus) {
      return;
    }

    setValues({ ...values, loading: true });

    // params returned through react router Link
    firebase.campus(params.id).on('value', (snapshot) => {
      setValues({
        ...values,
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
      <Row className='mb-4'>
        <Col>
          <h2 className='text-center mt-3'>{campus.name} </h2>
          <Score ratings={ratings} />

          {loading && <div>Loading...</div>}
        </Col>
      </Row>
      <Row>
        <Col>
          <CampusInfo campus={campus} />
        </Col>
        <Col>
          <Row className='mb-4'>
            <Col>
              <CampusMajorsList campus={campus} />
            </Col>
          </Row>
          <Row>
            <Col>
              <CampusReviews campus={campus} setRatings={setRatings} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CampusDetails;
