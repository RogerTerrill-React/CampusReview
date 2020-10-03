import React, { useState } from 'react';
import AddCampusReviewForm from './AddCampusReviewForm';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const AddCampusReviewModal = ({ campus }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant='primary' size='sm' className='position-absolute' style={{ right: '5px', bottom: '5px', top: '5px' }} onClick={() => setModalShow(true)}>
        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
        </svg>
      </Button>
      <Modal
        onHide={() => setModalShow(false)}
        show={modalShow}
        size='lg'
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCampusReviewForm campus={campus} setModalShow={setModalShow} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCampusReviewModal;
