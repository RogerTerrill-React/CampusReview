import React, { useState, useEffect } from 'react';
import { useMajorsList } from '../Major';
import { MajorReviewsList } from './MajorList';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

const MajorReviews = ({ campus, major, setRatings }) => {
  const majorsList = useMajorsList()
  
  const INITIAL_STATE ={
    average: 0,
    count: 0,
  }

  const [values, setValues] = useState(INITIAL_STATE);
  const {average, count} = values;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    
    // Filter list to only thos that have reviews and match the major
    const majorWithReviews = majorsList.filter(majorElement => {
      return majorElement.reviews && major.uid === majorElement.uid;
    });
    if(majorWithReviews[0]){

      // Add the uid to each review object
      const reviewsList = Object.keys(majorWithReviews[0].reviews).map((key) => ({
        ...majorWithReviews[0].reviews[key],
        uid: key,
      }));
      
      // Filter list to the specific campus
      const campusMajorReviewList = reviewsList.filter(review => {
        return review.campusUid === campus.uid;
      });

      setReviews(campusMajorReviewList);
      const scoreArray = campusMajorReviewList.map(review => review.score);
      const length = scoreArray.length ? scoreArray.length : 1
      const total = scoreArray.reduce(((score, sum) => score + sum),0)
      const average = total / length;
      setValues({...values, average, count: scoreArray.length});
      setRatings(scoreArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [majorsList.length])

  return (
    <>
      {majorsList && count}

      {average.toFixed(2) }
      <Card>
        <Card.Header as="h5" className='text-center position-relative'>
           Recent Reviews {/*<AddCampusReviewModal campus={campus} /> */}
        </Card.Header>
        <ReviewsBox>
          {reviews && <MajorReviewsList reviews={reviews} />}
        </ReviewsBox>
      </Card>
    </>
  )
}

export default MajorReviews;

const ReviewsBox = styled.div`
  max-height: 49rem;
  overflow-y: auto;
`