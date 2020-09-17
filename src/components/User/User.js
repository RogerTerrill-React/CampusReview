import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import UserList from './UserList';

const User = () => {
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
      <UserList users={users} />
    </>
  );
};

export default User;
