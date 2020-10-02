import React from 'react';
import CourseItem from './CourseItem';
import { useCourseList } from '../Course';

// Fill courses list
const CourseList = () => {
  const courses = useCourseList();

  return (
    courses ? <ul className="list-group">
      {courses.map((course, index) => (
        <CourseItem key={course.uid} index={index} course={course} />
      ))}
    </ul>
    : <p>No courses</p>
  )
}

const CampusMajorCoursesList = ({ campus, major }) => {
  const courses = useCourseList();
  let index = -1;
  
  return (
    <ul className="list-group">
      {courses.map((course) => {
        const isCourse = (major.uid === course.majorId) && (campus.uid === course.schoolId)
        
        if (!isCourse) {
          return null;
        }
        index++;
        return <CourseItem key={course.uid} index={index} course={course} />;
      })}
      
    </ul>
  );
}

export { CampusMajorCoursesList }
export default CourseList;
