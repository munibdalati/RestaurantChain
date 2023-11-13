// applicationController.js
const Form1 = require("../models/basicInformationModel");
const Form2 = require("../models/menuModel");
const Form3 = require("../models/maintenanceModel");
const Application = require("../models/applicationModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

exports.getApplication = async (req, res) => {
  try {
    const {
      form1Id,
      form2Id,
      form3Id,
    } = req.body;

    // Create Application and link to existing Form1, Form2, and Form3
    const application = await Application.create({
      form1: form1Id,
      form2: form2Id,
      form3: form3Id,
    });

    // create token
    const token = createToken(application._id);

    res.status(200).json({ status: "success", application, token });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};
