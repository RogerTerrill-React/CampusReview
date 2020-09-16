import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';

const UserItem = ({ match, location }) => {
  const firebase = useFirebase();

  const INITIAL_STATE = {
    loading: false,
    user: null,
    ...location.state,
  };

  const [values, setValues] = useState(INITIAL_STATE);

  const onSendPasswordResetEmail = () => {
    firebase.doPasswordReset(values.user.email);
  };

  useEffect(() => {
    if (values.user) {
      return;
    }

    setValues({ ...values, loading: true });

    firebase.user(match.params.id).on('value', (snapshot) => {
      setValues({
        loading: false,
        user: snapshot.val(),
      });
    });
    return () => firebase.user(match.params.id).off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { user, loading } = values;

  return (
    <>
      <h2>User ({match.params.id})</h2>
      {loading && <div>Loading...</div>}

      {user && (
        <div>
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
            <button type='button' onClick={onSendPasswordResetEmail}>
              Send Password Reset
            </button>
          </span>
        </div>
      )}
    </>
  );
};

export default UserItem;
