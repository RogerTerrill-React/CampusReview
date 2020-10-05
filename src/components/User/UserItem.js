import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import { useLocation, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const UserItem = () => {
  const firebase = useFirebase();
  const params = useParams();
  const location = useLocation();

  const INITIAL_STATE = {
    loading: false,
    user: null,
    ...location.state, // location comes from state in Link to
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

    // params returned through react router Link
    firebase.user(params.id).on('value', (snapshot) => {
      setValues({
        loading: false,
        user: snapshot.val(),
      });
    });
    return () => firebase.user(params.id).off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { user, loading } = values;

  return (
    <Card>
      <Card.Header as="h5" className="text-center">
        User - {user && user.username}
      </Card.Header>
      <h2>User ({params.id})</h2>
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
    </Card>
  );
};

export default UserItem;
