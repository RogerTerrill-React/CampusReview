import React from "react";
import Card from "react-bootstrap/Card";
import {useCampusList} from '../Campus';

const CourseInfo = ({ course }) => {
  const campusList = useCampusList();
  const campus = campusList.filter((campus) => campus.uid === course.schoolId)[0];
  return (
    <Card>
      <Card.Header as="h5" className="text-center">
        General Information
      </Card.Header>
      <Card.Body>
        <Card.Title>About</Card.Title>
        <Card.Text>{course.description}</Card.Text>
        <hr />
        <Card.Text>Offered at: {campus && campus.name}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CourseInfo;
