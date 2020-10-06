import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Card from 'react-bootstrap/Card';

const UserList = ({ users }) => {
  return (
    <Card>
      <Card.Header as='h5' className='text-center'>
        Users
      </Card.Header>
      <div style={{ maxHeight: '15rem', overflowY: 'auto' }}>
        {users.map((user) => (
          <li
            key={user.uid}
            className='list-group-item d-flex justify-content-between align-items-center'
          >
            <span>
              <strong>Username:</strong> {user.username}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
              <Link
                to={{
                  pathname: `${ROUTES.ADMIN_USERS}/${user.uid}`,
                  state: { user },
                }}
              >
                Details
              </Link>
            </span>
          </li>
        ))}
      </div>
    </Card>
  );
};

export default UserList;
