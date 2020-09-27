import React from 'react';
import CourseItem from './CourseItem';
import {useCourseList } from '../Course';

// Fill courses list
const CourseList = () => {
  const courses = useCourseList();

  return (
    <ul>
      {courses.map((course) => (
        <CourseItem course={course}/>
      ))}
    </ul>
  )
}

export default CourseList
