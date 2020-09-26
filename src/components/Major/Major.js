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
      const majorsSnapshot = snapshot.val();

      if (majorsSnapshot) {
        // convert campus list from snapshot
        const majorList = Object.keys(majorsSnapshot).map((key) => ({
          ...majorsSnapshot[key],
          uid: key,
        }));

        console.log(majorList)
        setValues({ ...values, loading: false, majors: majorList });
      } else {
        setValues({ ...values, loading: false, majors: null });
      }
    });
    return () => firebase.majors().off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { majors, loading } = values;

  return (
    <>
    <h1>Majors List</h1>
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
