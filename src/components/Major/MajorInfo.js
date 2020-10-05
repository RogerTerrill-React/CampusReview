import React from "react";
import Card from "react-bootstrap/Card";

const MajorInfo = ({ major }) => {
  return (
    <Card>
      <Card.Header as="h5" className="text-center">
        General Information
      </Card.Header>
      <Card.Body>
        <Card.Title>About</Card.Title>
        <Card.Text>{major.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MajorInfo;
