import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const CampusItem = ({ campus, index }) => {
  return (
    <li className='list-group-item d-flex justify-content-between align-items-center'>
      <Link
        to={{
          pathname: `${ROUTES.CAMPUS}/${campus.uid}`,
          state: { campus },
        }}
      >
        {index + 1}. {campus.name}
      </Link>
      <span className='badge badge-primary badge-pill'>
        {campus.averageScore.toFixed(2)}
      </span>
    </li>
  );
};

export default CampusItem;
