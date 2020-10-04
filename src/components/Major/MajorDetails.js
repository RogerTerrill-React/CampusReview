import React, { useState, useEffect } from "react";
import { useFirebase } from "../Firebase";
import { useLocation, useParams } from "react-router-dom";

import { CampusesByMajorList } from "../Campus";
import { CampusMajorCoursesList } from "../Course";
import { Score } from "../Shared";
import MajorReviews from "./MajorReviews";
import MajorInfo from "./MajorInfo";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const MajorDetails = () => {
  const firebase = useFirebase();
  const params = useParams();
  const location = useLocation();

  const INITIAL_STATE = {
    loading: false,
    major: null,
    campus: null, // Gets set from location.state
    ...location.state, // location comes from state in Link to
  };

  const [values, setValues] = useState(INITIAL_STATE);
  const [ratings, setRatings] = useState({ reviewCount: 0, averageScore: 0 });

  useEffect(() => {
    if (values.major) {
      return;
    }

    setValues({ ...values, loading: true });

    // params returned through react router Link
    firebase.major(params.id).on('value', (snapshot) => {
      setValues({
        ...values,
        loading: false,
        major: snapshot.val(),
      });
    });
    return () => firebase.major(params.id).off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { campus, major, loading } = values;

  return (
    <>
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="text-center mt-3">{major.name} {!!campus && ` -  ${campus.name}`} </h2>
            {!campus && <Score ratings={ratings} />}
            {loading && <div>Loading...</div>}
          </Col>
        </Row>
        <Row>
          <Col>
            <Row className="mb-4">
              <Col>
                <MajorInfo major={major} />
              </Col>
            </Row>
            <Row>
              <Col>
                {campus && (
                  <CampusMajorCoursesList campus={campus} major={major} />
                )}
                {!campus && <CampusesByMajorList major={major} />}
              </Col>
            </Row>
          </Col>
          <Col>
            {campus && major && (
              <MajorReviews
                campus={campus}
                major={major}
                setRatings={setRatings}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MajorDetails;
