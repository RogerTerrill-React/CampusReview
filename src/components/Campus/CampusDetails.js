import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import { useLocation, useParams } from 'react-router-dom';
import { useAuthUser } from '../Session';

import AddCampusReviewModal from '../Review';

const CampusDetails = () => {
  const firebase = useFirebase();
  const params = useParams();
  const location = useLocation();
  const authUser = useAuthUser();

  const INITIAL_STATE = {
    loading: false,
    campus: null,
    ...location.state, // location comes from state in Link to
  };

  const [values, setValues] = useState(INITIAL_STATE);

  useEffect(() => {
    if (values.campus) {
      return;
    }

    setValues({ ...values, loading: true });

    // params returned through react router Link
    firebase.campus(params.id).on('value', (snapshot) => {
      setValues({
        loading: false,
        campus: snapshot.val(),
      });
    });
    return () => firebase.campus(params.id).off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { campus, loading } = values;

  return (
    <>
      <h2>Campus ({params.id})</h2>
      {loading && <div>Loading...</div>}

      {authUser && <AddCampusReviewModal campus={campus} />}

      {campus && <div>{campus.name}</div>}
    </>
  );
};

export default CampusDetails;
