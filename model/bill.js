const mongoose = require("mongoose");

const ReactBillDataSchema = new mongoose.Schema({
  userid: {
    type: String,
    // required:true,
    default:"",
  },
  customername: {
    type: String,
    default:"",
    // required:true
  },
  phonenumber: {
    type: String,
    default:"",
    // required:true
  },
  medicinename: {
    type: String,
    default:"",
    // required:true
  },
  quantity: {
    type: String,
    default:"",
    // required:true
  },
  price:{
    type: String,
    default:"",
    // required:true
  },
  date: {
    type: String,
    default:"",
    // required:true
  },
  exp: {
    type: String,
    default:"",
    // required:true
  },
  type: {
    default:"",
    type: String,
    // required:true,
  },
  pack: {
    default:"",
    type: String,
    // required:true
  },
  mrp: {
    type: String,
    default:"",
    // required:true
  },
  finalDiscount: {
    type: String,
    default:"",
    // required:true
  },
  gst: {
    type: String,
    default:"",
    // required:true
  },
  batchNo: {
    type: String,
    default:"",
    // required:true
  },
  customerLocation: {
    type: String,
    default:"",
    // required:true
  },
  diseaseType: {
    type: String,
    default:"",
    // required:true
  },
  loyaltyPoints: {
    type: String,
    default:"",
    // required:true
  },
  refillReminder: {
    type: String,
    default:"",
    // required:true
  },
  isPrescribed: {
    type: String,
    default:"",
    // required:true
  },
  billPreferance: {
    default:"",
    type: String,
    // required:true
  },
  doctorName: {
    type: String,
    default:"",
    // required:true
  },
  invoiceNumber: {
    type: String,
    default:"",
    // required:true
  },
  address: {
    type: String,
    default:"",
    // required:true
  },
  doctorDiscount: {
    type: String,
    default:"",
    // required:true
  },
});

const bill = mongoose.model("bill", ReactBillDataSchema);
module.exports = bill;
