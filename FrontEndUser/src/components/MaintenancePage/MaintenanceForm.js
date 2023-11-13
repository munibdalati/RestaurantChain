import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/FormComponent.css";
import "react-phone-number-input/style.css";
import { Link } from "react-router-dom";

function MaintenanceForm() {
  const [validated, setValidated] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [impact, setImpact] = useState("");
  const [comments, setComments] = useState("");

  const [error, setError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);


  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/maintenance/addForm3",
        {
          startDate,
          endDate,
          impact,
          price,
          comments
        },
        config
      );

      console.log(response.data.token);
      console.log(response.data);

      navigate("/Confirmation");
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        console.log(err.response.data); // This will print the error response from the server
        setError(err.response.data.error);
      } else if (err.request) {
        // The request was made but no response was received
        console.error("Request made, but no response received:", err.request);
      } else {
        // Something happened in setting up the request
        console.error("Error setting up the request:", err.message);
      }

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      navigate("/Confirmation");
    }
  }, []);

  return (
    <Container style={{ paddingTop: 50 }} >
      <Row>
        <Col md="2"></Col>
        <Col md="8">
          <h4 className="mb-5">Step 3: Maintenance Form</h4>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* First Row */}
            <Row>
              <Form.Group
                as={Col}
                md="6"
                controlId="validationCustom01"
                className="mb-3"
              >
                <Form.Label>Maintenance Start date</Form.Label>
                <input type="date" min={new Date().toISOString().split('T')[0]} className="mx-3" value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  isInvalid={formSubmitted && !startDate} />
              </Form.Group>
              <Form.Group
                as={Col}
                md="6"
                controlId="validationCustom01"
                className="mb-3"
              >
                <Form.Label>Maintenance End date</Form.Label>
                <input type="date" min={new Date().toISOString().split('T')[0]} className="mx-3"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  isInvalid={formSubmitted && !endDate} />
              </Form.Group>
            </Row>
            {/* Second Row */}
            <Row>
              <Form.Group
                as={Col}
                md="6"
                controlId="validationCustom08"
                className="mb-3"
              >
                <Form.Label>Impact on the Restaurant</Form.Label>
                <Form.Control
                  as="select"
                  value={impact}
                  onChange={(e) => setImpact(e.target.value)}
                  isInvalid={formSubmitted && !impact}
                >
                  <option value="">Select the Impact</option>
                  <option value="Complete shutdown">Complete shutdown</option>
                  <option value="Partial shutdown">Partial shutdown</option>
                  <option value="Normal operations">Normal operations</option>
                </Form.Control>
              </Form.Group>

              <Form.Group
                as={Col}
                md="6"
                controlId="validationCustom05"
                className="mb-3"
              >
                <Form.Label>Quota/Price of the maintenance</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter the price of the maintenance in USD"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  isInvalid={formSubmitted && !price}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your street.
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            {/* Forth Row */}
            <Row>
              <Form.Group
                as={Col}
                md="12"
                controlId="validationCustom05"
                className="mb-3"
              >
                <Form.Label>Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  isInvalid={formSubmitted && !comments}
                />
              </Form.Group>
            </Row>
            <Button type="submit" className="Food__btn">
              Submit form
            </Button>
          </Form>
        </Col>
        <Col md="2"></Col>
      </Row>
    </Container>
  );
}

export default MaintenanceForm;
