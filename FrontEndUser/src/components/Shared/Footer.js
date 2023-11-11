import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import "../../style/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  // Get the current year using JavaScript
  const currentYear = new Date().getFullYear();
  const linkStyle = {
    textDecoration: "none",
  };

  return (
    <Container className="footer">
      <Row
        className="align-items-center text-center justify-content-center"
        style={{ paddingBottom: 30, paddingTop: 30 }}
      >
        <Col>
          <Link style={linkStyle} to="/">
            <p className="footer__brand">Food Garden</p>
          </Link>
        </Col>
        <Col>
          Copyright © {currentYear} Powered by Munib Al Dalati
        </Col>
        <Col className="d-flex justify-content-center gap-3">
          <i
            className="fa-brands fa-facebook-f"
            style={{ color: "var(--primarycolor)", cursor: "pointer" }}
          ></i>
          <i
            className="fa-brands fa-twitter"
            style={{ color: "var(--primarycolor)", cursor: "pointer" }}
          ></i>
          <i
            className="fa-brands fa-linkedin-in"
            style={{ color: "var(--primarycolor)", cursor: "pointer" }}
          ></i>
          <i
            class="fa-solid fa-envelope"
            style={{ color: "var(--primarycolor)", cursor: "pointer" }}
          ></i>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
