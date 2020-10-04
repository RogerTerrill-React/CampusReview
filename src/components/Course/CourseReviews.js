import React, { useState, useEffect } from 'react';
import { useCourseList } from '../Course';
import { useAuthUser } from "../Session";
import AddCourseReviewModal from './AddCourseReviewModal';
import {CourseReviewsList} from './CourseList';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

const CourseReviews = ({ course, setRatings }) => {
  const courseList = useCourseList();
  const authUser = useAuthUser();
  
  const INITIAL_STATE ={
    average: 0,
    count: 0,
  }

  const [values, setValues] = useState(INITIAL_STATE);
  const [reviews, setReviews] = useState([]);
  const [ratingsArray, setRatingsArray] = useState([]);

  useEffect(() => {
    
    // Filter list to only those that have reviews and match the course
    const courseWithReviews = courseList.filter(courseElement => {
      return courseElement.reviews && course.uid === courseElement.uid;
    });
    
    if(courseWithReviews[0]){

      // Add the uid to each review object
      const reviewsList = Object.keys(courseWithReviews[0].reviews).map((key) => ({
        ...courseWithReviews[0].reviews[key],
        uid: key,
      }));
      console.log(reviewsList)
      setReviews(reviewsList);
      const scoreArray = reviewsList.map(review => review.score);
      const length = scoreArray.length ? scoreArray.length : 1
      const total = scoreArray.reduce(((score, sum) => score + sum),0)
      const average = total / length;
      setRatings({reviewCount: length, averageScore: average});
      setValues({...values, average, count: scoreArray.length});
      setRatingsArray(scoreArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseList.length])

  return (
    <>
      <Card>
        <Card.Header as="h5" className='text-center position-relative'>
           Recent Reviews {authUser && <AddCourseReviewModal
                course={course}
                ratingsArray={ratingsArray}
              />}
        </Card.Header>
        <ReviewsBox>
          {reviews && <CourseReviewsList reviews={reviews} />}
        </ReviewsBox>
      </Card>
    </>
  )
}

export default CourseReviews;

const ReviewsBox = styled.div`
  max-height: 49rem;
  overflow-y: auto;
`