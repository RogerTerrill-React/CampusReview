import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const CampusItem = ({ campus }) => {
  return (
    <li>
      <Link
        to={{
          pathname: `${ROUTES.CAMPUS}/${campus.uid}`,
          state: { campus },
        }}
      >
        {campus.name}
      </Link>
    </li>
  );
};

export default CampusItem;
