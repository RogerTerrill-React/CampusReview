import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const CourseItem = ({ course, index }) => {
  return (
    <li className='list-group-item d-flex justify-content-between align-items-center'>
      <Link
        to={{
          pathname: `${ROUTES.COURSE}/${course.uid}`,
          state: { course },
        }}
      >
        {index + 1}. {course.code}-{course.name}
      </Link>
      <span className='badge badge-primary badge-pill'>
        {course.averageScore.toFixed(2)}
      </span>
    </li>
  );
};

export default CourseItem;
