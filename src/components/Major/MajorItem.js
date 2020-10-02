import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const MajorItem = ({ major, campus, index }) => {
  return (
    <li className='list-group-item d-flex justify-content-between align-items-center'>
      <Link
        to={{
          pathname: `${ROUTES.MAJOR}/${major.uid}`,
          state: { major, campus },
        }}
      >
        {index + 1}. {major.name} ({major.code})
      </Link>
      <span className='badge badge-primary badge-pill'>
        {major.averageScore.toFixed(2)}
      </span>
    </li>
  );
};

export default MajorItem;
