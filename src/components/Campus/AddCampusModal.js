import React, { useState } from 'react';
import AddCampusForm from './AddCampusForm';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AddCampusModal = () => {
  const [campusModalShow, setCampusModalShow] = useState(false);

  return (
    <>
      <Button variant='primary' onClick={() => setCampusModalShow(true)}>
        Add Campus
      </Button>
      <Modal
        onHide={() => setCampusModalShow(false)}
        show={campusModalShow}
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
