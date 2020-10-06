import React from 'react';
import Card from 'react-bootstrap/Card';

const CampusInfo = ({ campus }) => {
  return (
    <Card>
      <Card.Header as='h5' className='text-center'>
        General Information
      </Card.Header>
      <Card.Img variant='top' className='p-4' src={campus.logoUrl} />
      <Card.Body>
        <Card.Title>About</Card.Title>
        <Card.Text>{campus.about}</Card.Text>
      </Card.Body>
      <Card.Body>
        <Card.Title>Website</Card.Title>
        <Card.Text>
          <a target='_blank' rel='noopener noreferrer' href={campus.url}>
            {campus.url}
          </a>
        </Card.Text>
      </Card.Body>

      <Card.Body>
        <Card.Title>Address</Card.Title>
        <Card.Text className='mb-0'>{campus.address}</Card.Text>
        <Card.Text className='mb-0'>
          {campus.city}, {campus.state} {campus.zipcode}
        </Card.Text>
        <Card.Text className='mb-0'>{campus.phoneNumber}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CampusInfo;
