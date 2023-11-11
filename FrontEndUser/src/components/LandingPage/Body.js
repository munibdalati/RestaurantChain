import React from "react";
import "../../style/Body.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import restaurant from "../../assets/restaurant.svg";
import { Link } from "react-router-dom";

function Body() {
  const scrollToBottom = () => {
    const windowHeight = window.innerHeight
    window.scrollTo(0, windowHeight)
  }
  return (
    <Container>
      <Row className="align-items-center mt-5">
        <Col className="first__col d-flex flex-column align-items-center text-center">
          <h1>
            Open your restaurant and join our amazing Chain
            <strong style={{ color: "var(--primarycolor)" }}> Food Garden</strong>
          </h1>
          <Link to={"/BasicInformationPage"}>
            <Button className="btn-orange mt-4" onClick={scrollToBottom}>Join Us</Button>
          </Link>
        </Col>
        <Col>
          <img src={restaurant} alt="restaurant" />
        </Col>
      </Row>
    </Container>
  );
}

export default Body;
