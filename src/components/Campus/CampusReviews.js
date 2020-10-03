import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import { CampusReviewsList } from './CampusList';
import AddCampusReviewModal from './AddCampusReviewModal'
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

const CampusReviews = ({ campus, setRatings }) => {
  const firebase = useFirebase();

  const [reviews, setReviews] = useState(null);

  // Fetch all reviews for a campus
  useEffect(() => {
    firebase.campusReviews(campus.uid).on('value', (snapshot) => {
      const campusReviewsObject = snapshot.val();

      if (campusReviewsObject) {
        const campusReviewsList = Object.keys(campusReviewsObject).map(
          (key) => ({
            ...campusReviewsObject[key],
            uid: key,
          })
        );
        setReviews(campusReviewsList);
      } else {
        setReviews(null);
      }
    });
    return () => firebase.campusReviews(campus.uid).off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card>
        <Card.Header as="h5" className='text-center position-relative'>
          Recent Reviews <AddCampusReviewModal campus={campus} />
          </Card.Header>
        <ReviewsBox>
          {reviews && <CampusReviewsList reviews={reviews} />}
        </ReviewsBox>
      </Card>
    </>
  )
}

export default CampusReviews;

const ReviewsBox = styled.div`
  max-height: 49rem;
  overflow-y: auto;
`