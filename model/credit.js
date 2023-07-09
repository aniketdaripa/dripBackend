const mongoose = require("mongoose");

const ReactCreditDataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  distributorName: {
    type: String,
  },
  creditAmount:{
    type:String
  },
  isPaid:{
    type:Boolean
  }
});

const credit = mongoose.model("credit", ReactCreditDataSchema);
module.exports = credit;
