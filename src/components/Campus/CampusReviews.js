import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import { CampusReviewsList } from './CampusList';

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
      {reviews && <CampusReviewsList reviews={reviews} />}
    </>
  )
}

export default CampusReviews;
