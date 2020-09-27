import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const CourseItem = ({ course }) => {
  return (
    <li>
      <Link
        to={{
          pathname: `${ROUTES.COURSE}/${course.uid}`,
          state: { course },
        }}
      >
        {course.name}
      </Link>
    </li>
  );
}

export default CourseItem
