import React, { useState } from 'react';
import  AddCampusReviewForm  from './AddCampusReviewForm';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AddCampusReviewModal = ({ campus, setValues }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant='primary' onClick={() => setModalShow(true)}>
        Add Campus Review
      </Button>
      <Modal
        onHide={() => setModalShow(false)}
        show={modalShow}
        size='lg'
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Campus Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCampusReviewForm campus={campus} setModalShow={setModalShow}/>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCampusReviewModal;
