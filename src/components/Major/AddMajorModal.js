import React, { useState } from 'react';
import AddMajorForm from './AddMajorForm';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AddMajorModal = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant='primary' onClick={() => setModalShow(true)}>
        Add Major
      </Button>
      <Modal
        onHide={() => setModalShow(false)}
        show={modalShow}
        size='lg'
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Major</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMajorForm setModalShow={setModalShow}/>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddMajorModal;
