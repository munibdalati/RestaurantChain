const mongoose = require("mongoose");

const form3Schema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    impact: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
    }
  },
  { timestamps: true }
);

form3Schema.statics.addForm3 = async function (
  startDate,
  endDate,
  price,
  impact,
  comments
) {
  const form3 = await this.create({
    startDate,
    endDate,
    price,
    impact,
    comments
  });

  return form3;
};

const Form3 = mongoose.model("Form3", form3Schema);

module.exports = Form3;
