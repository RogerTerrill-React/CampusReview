import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import { useLocation, useParams } from 'react-router-dom';
import { useAuthUser } from '../Session';

import AddCampusReviewModal from './AddCampusReviewModal';
import { MajorListLinks } from '../Major';

const CampusDetails = () => {
  const firebase = useFirebase();
  const params = useParams();
  const location = useLocation();
  const authUser = useAuthUser();

  const INITIAL_STATE = {
    loading: false,
    campus: null,
    reviews: null,
    majors: null,
    ...location.state, // location comes from state in Link to
  };

  const [values, setValues] = useState(INITIAL_STATE);

  // Get information on specific campus
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

  // Get information on all majors
  useEffect(() => {
    setValues({ ...values, loading: true });

    firebase.majors().on('value', (snapshot) => {
      const majorsSnapshot = snapshot.val();

      if (majorsSnapshot) {
        // convert campus list from snapshot
        const majorList = Object.keys(majorsSnapshot).map((key) => ({
          ...majorsSnapshot[key],
          uid: key, // This returns the uid of this 
        }));

        setValues({ ...values, loading: false, majors: majorList });
      } else {
        setValues({ ...values, loading: false, majors: null });
      }
    });
    return () => firebase.majors().off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const { majors, campus, loading } = values;
  console.log(majors)

  return (
    <>
      <h1>{campus.name} </h1>

      {campus.reviewCount ? (
        <h2>
          The average score is {campus.averageScore} based on{' '}
          {campus.reviewCount} reviews
        </h2>
      ) : (
        <h2>No reviews yet...</h2>
      )}
      {loading && <div>Loading...</div>}

      {authUser && <AddCampusReviewModal campus={campus} />}

      {majors && <MajorListLinks campus={campus} majors={majors}/>}
    </>
  );
};

export default CampusDetails;
