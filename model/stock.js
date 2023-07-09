const mongoose = require("mongoose");

const ReactStockDataSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  name: {
    type: String,
    // required:true
  },
  quantity: {
    type: String,
    // required:true,
  },
  scheme: {
    type: String,
    // required:true
  },
  type: {
    type: String,
    // required:true
  },
  pack: {
    type: String,
    // required:true
  },
  mrp: {
    type: String,
    // required:true
  },
  msp: {
    type: String,
    // required:true
  },
  hsn: {
    type: String,
    // required:true
  },
  rate: {
    type: String,
    // required:true
  },
  exp: {
    type: String,
    // required:true
  },
  mfg: {
    type: String,
    // required:true
  },
  batchNo: {
    type: String,
    // required:true
  },
  schedule: {
    type: String,
    // required:true
  },
  salt: {
    type: String,
    // required:true
  },
  temperature: {
    type: String,
    // required:true
  },
  medicineTime: {
    type: String,
    // required:true
  },
  companyDiscount: {
    type: String,
    // required:true
  },
  customerDiscount: {
    type: String,
    // required:true
  },
  gst: {
    type: String,
    // required:true
  },
});

const stock = mongoose.model("stock", ReactStockDataSchema);
module.exports = stock;
