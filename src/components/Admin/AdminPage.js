import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

import UserList from './UserList';

const AdminPage = () => {
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
      <h1>Admin</h1>
      <p>The Admin Page is accessible by every signed in admin user.</p>
      {loading && <div>Loading...</div>}
      <UserList users={users} />
    </>
  );
};

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default withAuthorization(condition)(AdminPage);
