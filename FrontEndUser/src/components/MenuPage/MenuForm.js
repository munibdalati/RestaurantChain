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


function MenuForm() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [meals, setMeals] = useState([]);
  const [checkedMeals, setCheckedMeals] = useState({});


  const menuItems = [
    "Chicken Bliss",
    "Veggie Delight",
    "Spicy Shrimp Bowl",
    "Quinoa Mix",
    "Grilled Salmon",
    "Tofu Zest",
    "Chickpea Stir-Fry",
    "Tomato Basil Pasta",
    "Teriyaki Skewers",
    "Eggplant Stack",
    "Citrus Tilapia",
    "Vegetarian Pad Thai",
    "Garlic Shrimp",
    "Lentil Stew",
    "Caprese Salad",
    "Pesto Zoodles",
    "Sweet Potato Tacos",
    "Teriyaki Bowl",
    "Spinach Curry"
  ];

  // Function to handle checkbox changes
  const handleCheckboxChange = (meal) => {
    setCheckedMeals((prevCheckedMeals) => ({
      ...prevCheckedMeals,
      [meal]: !prevCheckedMeals[meal],
    }));
  };

  const handleTimeChange = (meal, type, value) => {
    setMeals((prevMeals) => {
      const updatedMeals = [...prevMeals];
      const mealIndex = updatedMeals.findIndex((item) => item.meal === meal);

      if (mealIndex !== -1) {
        // Update existing meal
        updatedMeals[mealIndex][type] = value;
      } else {
        // Add new meal
        updatedMeals.push({ meal, openTime: "", closeTime: "" });
      }

      return updatedMeals;
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
        "http://localhost:8000/api/menu/addForm2",
        {
          meals
        },
        config
      );

      console.log(response.data.token);
      console.log(response.data);

      navigate("/MaintenancePage");
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
      navigate("/MaintenancePage");
    }
  }, []);

  return (
    <Container style={{ paddingTop: 50 }}>
      <Row>
        <Col md="2"></Col>
        <Col md="8">
          <h4 className="mb-5">Step 2: Menu Form</h4>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} md="12" controlId="validationCustom05" className="mb-3">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: "40%" }}>Meal</th>
                    <th style={{ width: "30%" }}>Start Serving Time</th>
                    <th style={{ width: "30%" }}>End Serving Time</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((meal) => (
                    <tr key={meal}>
                      <td>
                        <input
                          type="checkbox"
                          id={meal}
                          value={meal}
                          className="mx-2"
                          checked={checkedMeals[meal]}
                          onChange={() => handleCheckboxChange(meal)}
                        />
                        <label htmlFor={meal}>{meal}</label>
                      </td>
                      <td>
                        <input
                          type="time"
                          required
                          disabled={!checkedMeals[meal]}
                          value={meals.find((item) => item.meal === meal)?.openTime || ''}
                          onChange={(e) => handleTimeChange(meal, 'openTime', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="time"
                          required
                          disabled={!checkedMeals[meal]}
                          value={meals.find((item) => item.meal === meal)?.closeTime || ''}
                          onChange={(e) => handleTimeChange(meal, 'closeTime', e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button type="submit" className="Food__btn">
                Submit form
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md="2"></Col>
      </Row>
    </Container>
  );
}

export default MenuForm;
