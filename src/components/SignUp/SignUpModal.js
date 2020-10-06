import React, { useState } from 'react';
import SignUpForm from './SignUpForm';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SignUpModal = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant='outline-light' onClick={() => setModalShow(true)}>
        Sign Up
      </Button>
      <Modal
        onHide={() => setModalShow(false)}
        show={modalShow}
        size='sm'
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignUpForm setModalShow={setModalShow} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUpModal;
