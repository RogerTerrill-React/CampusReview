import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import CampusList from './CampusList';

const Campus = () => {
  const firebase = useFirebase();

  const INITIAL_STATE = {
    loading: false,
    campuses: [],
  };

  const [values, setValues] = useState(INITIAL_STATE);

  useEffect(() => {
    setValues({ ...values, loading: true });

    firebase.campuses().on('value', (snapshot) => {
      const campusObject = snapshot.val();

      if (campusObject) {
        // convert campus list from snapshot
        const campusList = Object.keys(campusObject).map((key) => ({
          ...campusObject[key],
          uid: key,
        }));
        setValues({ ...values, loading: false, campuses: campusList });
      } else {
        setValues({ ...values, loading: false, campuses: null });
      }
    });
    return () => firebase.campuses().off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { campuses, loading } = values;

  return (
    <>
    <h1>Campuses List</h1>
      {loading && <div>Loading...</div>}
      {campuses ? (
        <CampusList campuses={campuses} />
      ) : (
        <div>There are no campuses...</div>
      )}
    </>
  );
};

export default Campus;
