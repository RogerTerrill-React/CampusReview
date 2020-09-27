import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import { useLocation, useParams } from 'react-router-dom';
import { useAuthUser } from '../Session';

import AddCourseReviewModal from './AddCourseReviewModal';

const CourseDetails = () => {
  const firebase = useFirebase();
  const params = useParams();
  const location = useLocation();
  const authUser = useAuthUser();

  const INITIAL_STATE = {
    loading: false,
    major: null,
    campus: null,
    course: null,
    ...location.state, // location comes from state in Link to
  };

  const [values, setValues] = useState(INITIAL_STATE);

  useEffect(() => {
    if (values.course) {
      return;
    }

    setValues({ ...values, loading: true });

    // params returned through react router Link
    firebase.course(params.id).on('value', (snapshot) => {
      setValues({
        loading: false,
        course: snapshot.val(),
      });
    });
    return () => firebase.major(params.id).off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { course, loading } = values;

  return (
    <>
    {course && authUser && <AddCourseReviewModal course={course} />}
      <h2>Course ({params.id}) CourseDetails.js</h2>
      {loading && <div>Loading...</div>}

      {course && (
        <div>
          {course.name}
        </div>
      )}
    </>
  )
}

export default CourseDetails
