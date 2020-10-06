import React, { useState } from "react";
import SignInForm from "./SignInForm";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const SignInModal = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="outline-light" onClick={() => setModalShow(true)}>
        Sign In
      </Button>
      <Modal
        onHide={() => setModalShow(false)}
        show={modalShow}
        size="lg"
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignInForm setModalShow={setModalShow} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignInModal;
