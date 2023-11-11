const mongoose = require("mongoose");

const form1Schema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    openHour: {
      type: Number,
      required: true,
    },
    closeHour: {
      type: Number,
      required: true,
    },
    landmark1: {
      type: String,
      required: true,
    },
    landmark2: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

form1Schema.statics.addForm1 = async function (
  restaurantName,
  street,
  mobileNumber,
  openHour,
  closeHour,
  landmark1,
  landmark2,

) {
  const form1 = await this.create({
    restaurantName,
    street,
    mobileNumber,
    openHour,
    closeHour,
    landmark1,
    landmark2,
  });

  return form1;
};

const Form1 = mongoose.model("Form1", form1Schema);

module.exports = Form1;
