import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const UserList = () => {
  const firebase = useFirebase();

  const INITIAL_STATE = {
    loading: false,
    users: [],
  };

  const [values, setValues] = useState(INITIAL_STATE);

  useEffect(() => {
    setValues({ ...values, loading: true });

    firebase.users().on('value', (snapshot) => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));

      setValues({
        users: usersList,
        loading: false,
      });
    });
    return () => firebase.users().off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { users, loading } = values;

  return (
    <>
      <h2>Users</h2>
      {loading && <div>Loading...</div>}
      <ul>
        {users.map((user) => (
          <li key={user.uid}>
            <span>
              <strong>ID:</strong> {user.uid}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
              <strong>Username:</strong> {user.username}
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
      </ul>
    </>
  );
};

export default UserList;
