import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const CampusItem = ({campus}) => {
  return (
    <li>
          <span>{campus.name}</span>
          <span>
            <Link
            to={{
              pathname: `${ROUTES.CAMPUS}/${campus.uid}`,
              state: { campus },
            }}
            >Details</Link>
          </span>
        </li>
  )
}

export default CampusItem
