import React, { useState, useEffect } from "react";
import { useFirebase } from "../Firebase";
import { useLocation, useParams } from "react-router-dom";

import CourseReviews from "./CourseReviews";
import { Score } from "../Shared";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const CourseDetails = () => {
  const firebase = useFirebase();
  const params = useParams();
  const location = useLocation();

  const INITIAL_STATE = {
    loading: false,
    major: null,
    campus: null,
    course: null,
    ...location.state, // location comes from state in Link to
  };

  const [values, setValues] = useState(INITIAL_STATE);
  const [ratings, setRatings] = useState({ reviewCount: 0, averageScore: 0 });

  useEffect(() => {
    if (values.course) {
      return;
    }

    setValues({ ...values, loading: true });

    // params returned through react router Link
    firebase.course(params.id).on("value", (snapshot) => {
      setValues({
        ...values,
        loading: false,
        course: snapshot.val(),
      });
    });
    return () => firebase.course(params.id).off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { course, loading } = values;

  return (
    <>
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="text-center mt-3">{course.code}-{course.name} </h2>
            <Score ratings={ratings} />
            {loading && <div>Loading...</div>}
          </Col>
        </Row>
        <Row>
          <Col>
            <Row className="mb-4">
              <Col>{/* <MajorInfo major={major} /> */}</Col>
            </Row>
          </Col>
          <Col>
            {course && (
              <CourseReviews course={course} setRatings={setRatings} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CourseDetails;
