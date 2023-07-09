const mongoose = require("mongoose");

const ReactCurrStockDataSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  productname: {
    type: String,
    default: "",
  },
  unit: {
    type: String,
    // required:true
    default: "",
  },
  currentstock: {
    type: String,
    default: "",
  },
  costprice: {
    type: String,
    default: "",
    // required:true,
  },
  mrp: {
    type: String,
    default: "",
    // required:true
  },
  purchaseprice: {
    type: String,
    default: "",
    // required:true
  },
  salesprice: {
    type: String,
    default: "",
    // required:true
  },
  company: {
    type: String,
    default: "",
    // required:true
  },
  manufacturer: {
    type: String,
    default: "",
    // required:true
  },
  recdate: {
    type: String,
    default: "",
    // required:true
  },
  batch: {
    type: String,
    // required:true
    default: "",
  },
  mfg: {
    type: String,
    default: "",
    // required:true
  },
  exp: {
    type: String,
    default: "",
    // required:true
  },
  supplier: {
    type: String,
    default: "",
    // required:true
  },
  invno: {
    type: String,
    default: "",
    // required:true
  },
  invdate: {
    type: String,
    default: "",
    // required:true
  },
  temperature: {
    type: String,
    default: "",
    // required:true
  },
  medicinetime: {
    type: String,
    default: "",
    // required:true
  },
  companydiscount: {
    type: String,
    default: "",
    // required:true
  },
  customerdiscount: {
    type: String,
    default: "",
    // required:true
  },
  gst: {
    type: String,
    default: "",
    // required:true
  },
});

const currStock = mongoose.model("currStock", ReactCurrStockDataSchema);
module.exports = currStock;
