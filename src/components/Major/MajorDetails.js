import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import { useLocation, useParams } from 'react-router-dom';
import { useAuthUser } from '../Session';

import AddMajorReviewModal from './AddMajorReviewModal';
import { CampusMajorCoursesList } from '../Course';
import MajorReviews from './MajorReviews';

const MajorDetails = () => {
  const firebase = useFirebase();
  const params = useParams();
  const location = useLocation();
  const authUser = useAuthUser();

  const INITIAL_STATE = {
    loading: false,
    major: null,
    campus: null, // Gets set from location.state
    ...location.state, // location comes from state in Link to
  };

  const [values, setValues] = useState(INITIAL_STATE);

  useEffect(() => {
    if (values.major) {
      return;
    }

    setValues({ ...values, loading: true });

    // params returned through react router Link
    firebase.major(params.id).on('value', (snapshot) => {
      setValues({
        loading: false,
        major: snapshot.val(),
      });
    });
    return () => firebase.major(params.id).off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { campus, major, loading } = values;
  console.log(major)

  return (
    <>
      {campus && authUser && <AddMajorReviewModal campus={campus} major={major} />}
      <h2>Major ({params.id}) MajorDetails.js</h2>
      {loading && <div>Loading...</div>}
      

      {campus && major && (
        <div>
          <MajorReviews campus={campus} major={major} />
          {major.name}
        </div>
      )}

      {campus && <CampusMajorCoursesList campus={campus} major={major} />}
    </>
  )
}

export default MajorDetails
