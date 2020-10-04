import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import { useAuthUser } from "../Session";
import { CampusReviewsList } from './CampusList';
import AddCampusReviewModal from './AddCampusReviewModal'
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

const CampusReviews = ({ campus, setRatings }) => {
  const firebase = useFirebase();
  const authUser = useAuthUser();

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
        const scoreArray = campusReviewsList.map(review => review.score);
        const length = scoreArray.length ? scoreArray.length : 1
        const total = scoreArray.reduce(((score, sum) => score + sum),0)
        const average = total / length;
        setRatings({reviewCount: length, averageScore: average});
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
          Recent Reviews { authUser && <AddCampusReviewModal campus={campus} />}
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