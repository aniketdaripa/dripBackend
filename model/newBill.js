const mongoose = require("mongoose");

const ReactNewBillDataSchema = new mongoose.Schema({
  userid: {
    type: String,
    // required:true
    default:""
  },
  date: {
    type: String,
    // required:true
    default:""
  },
  billno:{
    type:String,
    default:"",
  },
  partyname:{
    type:String,
    default:""
  },
  billamount:{
    type:String,
    default:""
  },
  partyphno:{
    type:String,
    default:""
  }
});

const newBill = mongoose.model("newBill", ReactNewBillDataSchema);
module.exports = newBill;
