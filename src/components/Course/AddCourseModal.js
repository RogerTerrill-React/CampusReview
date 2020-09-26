import React, { useState } from 'react';
import AddCourseForm from './AddCourseForm';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AddCourseModal = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant='primary' onClick={() => setModalShow(true)}>
        Add Course
      </Button>
      <Modal
        onHide={() => setModalShow(false)}
        show={modalShow}
        size='lg'
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCourseForm setModalShow={setModalShow}/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddCourseModal
