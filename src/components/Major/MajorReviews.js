import React, { useState, useEffect } from 'react';
import { useMajorsList } from '../Major';

const MajorReviews = ({ campus, major }) => {
  const majorsList = useMajorsList()
  
  const INITIAL_STATE ={
    average: 0,
  }

  const [values, setValues] = useState(INITIAL_STATE);

  useEffect(() => {
    
    // Filter list to only thos that have reviews and match the major
    const majorWithReviews = majorsList.filter(majorElement => {
      return majorElement.reviews && major.uid === majorElement.uid;
    });
    
    if(majorWithReviews[0]){
  
      const reviewsList = Object.values(majorWithReviews[0].reviews);
  
      // Filter list to the specific campus
      const campusMajorReviewList = reviewsList.filter(review => {
        return review.campusUid === campus.uid;
      });
  
      const scoreArray = campusMajorReviewList.map(review => review.score);
      const length = scoreArray.length ? scoreArray.length : 1
      const total = scoreArray.reduce(((score, sum) => score + sum),0)
      const average = total / length;
      setValues({...values, average});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [majorsList.length])


  return (
    <>
      |{ campus.name}-{major.name}|
      {majorsList && majorsList.length}

      {values.average }

    </>
  )
}

export default MajorReviews;
