import React, { useState, useEffect } from 'react';
import { useCourseList } from '../Course';

const CourseReviews = ({ course }) => {
  const courseList = useCourseList()
  
  const INITIAL_STATE ={
    average: 0,
    count: 0,
  }

  const [values, setValues] = useState(INITIAL_STATE);
  const {average, count} = values;

  useEffect(() => {
    
    // Filter list to only those that have reviews and match the course
    const courseWithReviews = courseList.filter(courseElement => {
      return courseElement.reviews && course.uid === courseElement.uid;
    });
    
    if(courseWithReviews[0]){
  
      const reviewsList = Object.values(courseWithReviews[0].reviews);
  
      const scoreArray = reviewsList.map(review => review.score);
      const length = scoreArray.length ? scoreArray.length : 1
      const total = scoreArray.reduce(((score, sum) => score + sum),0)
      const average = total / length;
      setValues({...values, average, count: scoreArray.length});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseList.length])

  return (
    <>
      |{ course.name}|
      {courseList && count}

      {average }
    </>
  )
}

export default CourseReviews;
