import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import CourseList from './CourseList';

const Course = () => {
  const firebase = useFirebase();

  const INITIAL_STATE = {
    loading: false,
    courses: [],
  };

  const [values, setValues] = useState(INITIAL_STATE);

  useEffect(() => {
    setValues({ ...values, loading: true });

    firebase.courses().on('value', (snapshot) => {
      const campusObject = snapshot.val();

      if (campusObject) {
        // convert campus list from snapshot
        const campusList = Object.keys(campusObject).map((key) => ({
          ...campusObject[key],
          uid: key,
        }));
        setValues({ ...values, loading: false, courses: campusList });
      } else {
        setValues({ ...values, loading: false, courses: null });
      }
    });
    return () => firebase.courses().off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { courses, loading } = values;

  return (
    <>
    <h1 className="text-center">Top Courses</h1>
      {loading && <div>Loading...</div>}
      {courses ? (
        <CourseList />
      ) : (
        <div>There are no courses...</div>
      )}
    </>
  );
};

export default Course;
