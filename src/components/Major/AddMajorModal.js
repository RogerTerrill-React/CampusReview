import React, { useState } from 'react';
import AddMajorForm from './AddMajorForm';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AddMajorModal = () => {
  const [campusModalShow, setCampusModalShow] = useState(false);

  return (
    <>
      <Button variant='primary' onClick={() => setCampusModalShow(true)}>
        Add Major
      </Button>
      <Modal
        onHide={() => setCampusModalShow(false)}
        show={campusModalShow}
        size='lg'
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Major</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMajorForm />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddMajorModal;
