import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import ListGroup from 'react-bootstrap/ListGroup';

const MajorItem = ({ major, campus }) => {
  return (
    <ListGroup.Item>
      <Link
        to={{
          pathname: `${ROUTES.MAJOR}/${major.uid}`,
          state: { major, campus },
        }}
      >
        {major.name} ({major.code})
      </Link>
    </ListGroup.Item>
  );
};

export default MajorItem;
