const Form1 = require("../models/basicInformationModel");
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
exports.createForm1 = async (req, res) => {
  const {
    restaurantName,
    street,
    mobileNumber,
    openHour,
    closeHour,
    landmark1,
    landmark2,
  } = req.body;

  try {
    const form1 = await Form1.addForm1(
      restaurantName,
      street,
      mobileNumber,
      openHour,
      closeHour,
      landmark1,
      landmark2,
    );

    // create token
    const token = createToken(form1._id);

    res.status(200).json({ status: "success", form1, token });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};
