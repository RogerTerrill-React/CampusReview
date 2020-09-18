import React, { useState } from 'react';
import AddCampusForm from './AddCampusForm';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AddCampusModal = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant='primary' onClick={() => setModalShow(true)}>
        Add Campus
      </Button>
      <Modal
        onHide={() => setModalShow(false)}
        show={modalShow}
        size='lg'
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Campus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCampusForm />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCampusModal;
