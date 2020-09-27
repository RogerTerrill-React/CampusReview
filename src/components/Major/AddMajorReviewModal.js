import React, { useState } from 'react';
import  AddMajorReviewForm  from './AddMajorReviewForm';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AddMajorReviewModal = ({ campus,  major }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant='primary' onClick={() => setModalShow(true)}>
        Add Major Review
      </Button>
      <Modal
        onHide={() => setModalShow(false)}
        show={modalShow}
        size='lg'
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Campus Review for {campus.name} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMajorReviewForm campus={campus} major={major} setModalShow={setModalShow}/>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddMajorReviewModal;