const Form3 = require("../models/maintenanceModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// --------------------get all application --------------------
exports.getAllApplication = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json({
      status: "success",
      results: applications.length,
      data: {
        applications,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
// ----------------- create application -----------------
exports.createForm3 = async (req, res) => {
  const {
    startDate,
    endDate,
    price,
    impact,
    comments
  } = req.body;

  try {
    const form3 = await Form3.addForm3(
      startDate,
      endDate,
      price,
      impact,
      comments
    );

    // create token
    const token = createToken(form3._id);

    res.status(200).json({ status: "success", form3, token });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};
