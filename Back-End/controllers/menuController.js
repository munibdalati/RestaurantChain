const Form2 = require("../models/menuModel");
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
exports.createForm2 = async (req, res) => {
  const {
    meals,
  } = req.body;

  try {
    const form2 = await Form2.addForm2(
      meals,
    );

    // create token
    const token = createToken(form2._id);

    res.status(200).json({ status: "success", form2, token });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

// --------------------delete application --------------------
exports.deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Application deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};