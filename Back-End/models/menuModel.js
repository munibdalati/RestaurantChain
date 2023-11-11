const mongoose = require("mongoose");

const form2Schema = new mongoose.Schema(
  {
    meals: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

form2Schema.statics.addForm2 = async function (
  meals,
) {
  const form2 = await this.create({
    meals,
  });

  return form2;
};

const Form2 = mongoose.model("Form2", form2Schema);

module.exports = Form2;
