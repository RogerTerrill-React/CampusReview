import React from 'react';
import CourseItem from './CourseItem';
import { useCourseList } from '../Course';

// Fill courses list
const CourseList = () => {
  const courses = useCourseList();

  return (
    courses ? <ul>
      {courses.map((course) => (
        <CourseItem key={course.uid} course={course} />
      ))}
    </ul>
    : <p>No courses</p>
  )
}

const CampusMajorCoursesList = ({ campus, major }) => {
  const courses = useCourseList();
  
  return (
    <ul>
      {courses.map((course) => {
        const isCourse = (major.uid === course.majorId) && (campus.uid === course.schoolId)
        
        if (!isCourse) {
          return null;
        }
        return <CourseItem key={course.uid} course={course} />;
      })}
      
    </ul>
  );
}

export { CampusMajorCoursesList }
export default CourseList;
