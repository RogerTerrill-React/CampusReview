import React from 'react';
import { useUserList } from '../User';
import Card from 'react-bootstrap/Card'

const MajorReview = ({ review }) => {
  const userList = useUserList();
  const user = userList.filter(user => user.uid === review.userId);

  return (
    <Card.Body className='border-bottom'>
      <Card.Title className='clearfix'>
        {/* <p className='float-left'>{review.startYear}-{review.endYear}</p> */}
        <p className='float-right'>Rating: {review.score}</p></Card.Title>
      <Card.Text className='font-italic'>
        "{review.review}"
      </Card.Text>
      <Card.Text className='text-right'>-{!!user[0] && user[0].username}</Card.Text>
    </Card.Body>
  )
}

export default MajorReview
