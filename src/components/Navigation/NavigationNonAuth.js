import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import * as ROUTES from "../../constants/routes";
import SignInModal from "../SignIn";

const NavigationNonAuth = () => {
  return (
    <>
      <SignInModal />
      <Nav.Link as={Link} className="text-light" to={ROUTES.SIGN_UP}>
        Sign Up
      </Nav.Link>
    </>
  );
};

export default NavigationNonAuth;
