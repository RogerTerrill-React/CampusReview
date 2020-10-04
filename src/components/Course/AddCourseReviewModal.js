import React, { useState } from 'react';
import  AddCourseReviewForm  from './AddCourseReviewForm';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AddMajorReviewModal = ({ course, ratingsArray }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant='primary' onClick={() => setModalShow(true)}>
        Add Course Review
      </Button>
      <Modal
        onHide={() => setModalShow(false)}
        show={modalShow}
        size='lg'
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Course Review for {course.name} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCourseReviewForm course={course} setModalShow={setModalShow} ratingsArray={ratingsArray}/>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddMajorReviewModal;