import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const MajorItem = ({ major }) => {
  return (
    <li>
      <Link
        to={{
          pathname: `${ROUTES.MAJOR}/${major.uid}`,
          state: { major },
        }}
      >
        {major.name} ({major.code})
      </Link>
    </li>
  );
};

export default MajorItem;
