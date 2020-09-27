import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const MajorItem = ({ major, campus }) => {
  return (
    <li>
      <Link
        to={{
          pathname: `${ROUTES.MAJOR}/${major.uid}`,
          state: { major, campus },
        }}
      >
        {major.name} ({major.code})
      </Link>
    </li>
  );
};

export default MajorItem;
