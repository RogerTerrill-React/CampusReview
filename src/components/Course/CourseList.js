import React from 'react';
import CourseItem from './CourseItem';
import { useCourseList } from '../Course';
import CourseReview from './CourseReview';
import Card from 'react-bootstrap/Card';

// Fill courses list
const CourseList = () => {
  const courses = useCourseList();
  const sortedCourseByAverageScore = courses.sort((a, b) =>
    a.averageScore < b.averageScore ? 1 : -1
  );

  return courses ? (
    <Card>
      <Card.Header as='h5' className='text-center'>
        Top Rated CSU Courses
      </Card.Header>
      <div style={{ 'maxHeight': '15rem', 'overflowY': 'auto' }}>
        {sortedCourseByAverageScore.map((course, index) => (
          <CourseItem key={course.uid} index={index} course={course} />
        ))}
      </div>
    </Card>
  ) : (
    <p>No courses</p>
  );
};

const CampusMajorCoursesList = ({ campus, major }) => {
  const courses = useCourseList();
  const sortedCourseByAverageScore = courses.sort((a, b) =>
    a.averageScore < b.averageScore ? 1 : -1
  );
  let index = -1;

  return (
    <Card>
      <Card.Header as='h5' className='text-center'>
        Curriculum
      </Card.Header>
      <div style={{ 'maxHeight': '15rem', 'overflowY': 'auto' }}>
        {sortedCourseByAverageScore.map((course) => {
          const isCourse =
            major.uid === course.majorId && campus.uid === course.schoolId;

          if (!isCourse) {
            return null;
          }
          index++;
          return <CourseItem key={course.uid} index={index} course={course} />;
        })}
      </div>
    </Card>
  );
};

const CourseReviewsList = ({ reviews }) => {
  const sortedCourseReviewsByTimeStamp = reviews.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );

  return sortedCourseReviewsByTimeStamp.map((review) => {
    return <CourseReview key={review.uid} review={review} />;
  });
};

export { CampusMajorCoursesList, CourseReviewsList };
export default CourseList;
