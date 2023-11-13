const Form2 = require("../models/menuModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};


// ----------------- create form 2 -----------------
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
