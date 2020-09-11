import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
// import { useAuthUser } from '../Session';
import MajorList from './MajorList';

const Major = () => {
  const firebase = useFirebase();
  // const authUser = useAuthUser();

  const INITIAL_STATE = {
    loading: false,
    majors: [],
  };

  const [values, setValues] = useState(INITIAL_STATE);

  useEffect(() => {
    setValues({ ...values, loading: true });

    firebase.majors().on('value', (snapshot) => {
      const campusObject = snapshot.val();

      if (campusObject) {
        // convert campus list from snapshot
        const campusList = Object.keys(campusObject).map((key) => ({
          ...campusObject[key],
          uid: key,
        }));
        setValues({ ...values, loading: false, majors: campusList });
      } else {
        setValues({ ...values, loading: false, majors: null });
      }
    });
    return () => firebase.majors().off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { majors, loading } = values;

  console.log(majors);
  return (
    <>
      {loading && <div>Loading...</div>}
      {majors ? (
        <MajorList majors={majors} />
      ) : (
        <div>There are no majors...</div>
      )}
    </>
  );
};

export default Major;
