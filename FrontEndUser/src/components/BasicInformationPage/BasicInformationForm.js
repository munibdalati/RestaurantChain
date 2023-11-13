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
import PhoneInput from "react-phone-number-input";
import { Link } from "react-router-dom";

function BasicInformationForm() {
  const [validated, setValidated] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [street, setStreet] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [workingDays, setWorkingDays] = useState([]);
  const [checkedDays, setCheckedDays] = useState({});
  const [landmark1, setLandmark1] = useState("");
  const [landmark2, setLandmark2] = useState("");

  const [error, setError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);



  const daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];


  // Function to handle checkbox changes
  const handleCheckboxChange = (day) => {
    setCheckedDays((prevCheckedDays) => ({
      ...prevCheckedDays,
      [day]: !prevCheckedDays[day],
    }));
  };

  // Function to handle time input changes
  const handleTimeChange = (day, type, value) => {
    setWorkingDays((prevWorkingDays) => {
      const updatedWorkingDays = [...prevWorkingDays];
      const dayIndex = updatedWorkingDays.findIndex((item) => item.day === day);

      if (dayIndex !== -1) {
        // Update existing day
        updatedWorkingDays[dayIndex][type] = value;
      } else {
        // Add new day
        updatedWorkingDays.push({ day, openTime: "", closeTime: "" });
      }

      return updatedWorkingDays;
    });
  };


  const handleSubmit = async (error) => {
    const form = error.currentTarget;
    if (form.checkValidity() === false) {
      error.preventDefault();
      error.stopPropagation();
    }
    setValidated(true);
    error.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/basicInfo/addForm1",
        {
          restaurantName,
          mobileNumber,
          street,
          workingDays,
          landmark1,
          landmark2
        },
        config
      );

      console.log(response.data.token);
      console.log(response.data);

      navigate("/MenuPage");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log(error.response.data); // This will print the error response from the server
        setError(error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request made, but no response received:", error.request);
      } else {
        // Something happened in setting up the request
        console.error("Error setting up the request:", error.message);
      }

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      navigate("/MenuPage");
    }
  }, []);

  return (
    <Container style={{ paddingTop: 50 }} >
    <Row>
      <Col md="2"></Col>
      <Col md="8">
        <h4 className="mb-5">Step 1: Basic Information Form</h4>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {/* First Row */}
          <Row>
            <Form.Group
              as={Col}
              md="12"
              controlId="validationCustom01"
              className="mb-3"
            >
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Full Name"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                isInvalid={formSubmitted && !restaurantName}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your first name.
              </Form.Control.Feedback>

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          {/* Second Row */}
          <Row>
            <Form.Group
              as={Col}
              md="12"
              controlId="validationCustom08"
              className="mb-3"
            >
              <Form.Label>Phone Number</Form.Label>
              <PhoneInput
                required
                placeholder="Enter your Mobile number ex:0788776655"
                value={mobileNumber}
                onChange={(value) => setMobileNumber(value)}
                isInvalid={formSubmitted && !mobileNumber}
                className="custom-phone-input"
              />
              <Form.Control.Feedback type="invalid">
                Please write a valid mobile Number
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          {/* Third Row */}
          <Row>
            <Form.Group
              as={Col}
              md="12"
              controlId="validationCustom05"
              className="mb-3"
            >
              <Form.Label>Street</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your street name"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                isInvalid={formSubmitted && !street}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your street.
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          {/* Forth Row */}
          <Row>
            <Form.Group as={Col} md="12" controlId="validationCustom05" className="mb-3">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: '50%' }}>Working Days</th>
                    <th style={{ width: '35%' }}>Open Time</th>
                    <th style={{ width: '35%' }}>Close Time</th>
                  </tr>
                </thead>
                <tbody>
                  {daysOfWeek.map((day) => (
                    <tr key={day}>
                      <td>
                        <input
                          type="checkbox"
                            id={day}
                            value={day}
                            className="mx-2"
                            checked={checkedDays[day]}
                            onChange={() => handleCheckboxChange(day)}
                        />
                        <label htmlFor={day}>{day}</label>
                      </td>
                      <td>
                          <input
                            type="time"
                            required
                            disabled={!checkedDays[day]}
                            value={workingDays.find((item) => item.day === day)?.openTime || ''}
                            onChange={(e) => handleTimeChange(day, 'openTime', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            required
                            disabled={!checkedDays[day]}
                            value={workingDays.find((item) => item.day === day)?.closeTime || ''}
                            onChange={(e) => handleTimeChange(day, 'closeTime', e.target.value)}
                          />
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Form.Group>
          </Row>
          {/* Third Row */}
          <Row>
            <Form.Group
              as={Col}
              md="12"
              controlId="validationCustom05"
              className="mb-3"
            >
              <Form.Label>Nearby Landmark</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Nearby Landmark 1"
                value={landmark1}
                onChange={(e) => setLandmark1(e.target.value)}
                isInvalid={formSubmitted && !landmark1}
                className="mb-2"
              />
              <Form.Control
                required
                type="text"
                placeholder="Enter Nearby Landmark 2"
                value={landmark2}
                onChange={(e) => setLandmark2(e.target.value)}
                isInvalid={formSubmitted && !landmark2}
              />
              <Form.Control.Feedback type="invalid">
                Please enter 2 nearby landmarks.
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit" className="Food__btn">
            Submit form
          </Button>
          <Link to={"/MenuPage"}>
            <Button className="Food__btn">Next</Button>
          </Link>
        </Form>
      </Col>

      <Col md="2"></Col>
      </Row>
    </Container>
  );
}

export default BasicInformationForm;
