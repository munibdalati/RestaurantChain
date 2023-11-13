const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  form1: { type: mongoose.Schema.Types.ObjectId, ref: "Form1" },
  form2: { type: mongoose.Schema.Types.ObjectId, ref: "Form2" },
  form3: { type: mongoose.Schema.Types.ObjectId, ref: "Form3" },
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
