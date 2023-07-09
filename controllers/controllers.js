const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Stock = require("../model/stock");
const TotalStock = require("../model/totalStock");
const Bill = require("../model/bill");
const ImageM = require("../model/imageModel");
const CreditM = require("../model/credit");
const CurrStockM=require("../model/currStock");
//excel data reading
let XLSX = require("xlsx");
const { response } = require("express");
const currStock = require("../model/currStock");
let workbook = XLSX.readFile("./medData.xls");
let workSheet = workbook.Sheets[workbook.SheetNames[0]];
let nameList = [];
let purchasePriceList = [];
let batchList = [];
let expList = [];
for (let index = 5; index < 10; index++) {
  const name = workSheet[`B${index}`].v;
  const purchasePrice = workSheet[`K${index}`].v;
  const batch = workSheet[`P${index}`].v;
  const exp = workSheet[`R${index}`].v;
  // console.log(name," ",purchasePrice," ", batch, " ", exp);
  nameList.push(name);
  purchasePriceList.push(purchasePrice);
  batchList.push(batch);
  expList.push(exp);
}
//
const addStockFunc = async (req, res) => {
  //curr stock
  const StockData = new Stock({
    userId: req.body.newStockData.userId,
    name: req.body.newStockData.name,
    quantity: req.body.newStockData.quantity,
    scheme: req.body.newStockData.scheme,
    type: req.body.newStockData.type,
    pack: req.body.newStockData.pack,
    mrp: req.body.newStockData.mrp,
    msp: req.body.newStockData.msp,
    hsn: req.body.newStockData.hsn,
    rate: req.body.newStockData.rate,
    msp: req.body.newStockData.msp,
    exp: req.body.newStockData.exp,
    mfg: req.body.newStockData.mfg,
    batchNo: req.body.newStockData.batchNo,
    schedule: req.body.newStockData.schedule,
    salt: req.body.newStockData.salt,
    temperature: req.body.newStockData.temperature,
    medicineTime: req.body.newStockData.medicineTime,
    companyDiscount: req.body.newStockData.companyDiscount,
    customerDiscount: req.body.newStockData.customerDiscount,
    gst: req.body.newStockData.gst,
  });
  const TotalStockData = new TotalStock({
    userId: req.body.newStockData.userId,
    name: req.body.newStockData.name,
    quantity: req.body.newStockData.quantity,
    scheme: req.body.newStockData.scheme,
    type: req.body.newStockData.type,
    pack: req.body.newStockData.pack,
    mrp: req.body.newStockData.mrp,
    msp: req.body.newStockData.msp,
    hsn: req.body.newStockData.hsn,
    rate: req.body.newStockData.rate,
    msp: req.body.newStockData.msp,
    exp: req.body.newStockData.exp,
    mfg: req.body.newStockData.mfg,
    batchNo: req.body.newStockData.batchNo,
    schedule: req.body.newStockData.schedule,
    salt: req.body.newStockData.salt,
    temperature: req.body.newStockData.temperature,
    medicineTime: req.body.newStockData.medicineTime,
    companyDiscount: req.body.newStockData.companyDiscount,
    customerDiscount: req.body.newStockData.customerDiscount,
    gst: req.body.newStockData.gst,
  });
  const creditAmount =
    Number(req.body.newStockData.quantity) * Number(req.body.newStockData.mrp);
  const creditData = new CreditM({
    userId: req.body.newStockData.userId,
    distributorName: req.body.newStockData.distributorName,
    creditAmount: creditAmount,
    isPaid: false,
  });
  try {
    //curr stock
    await StockData.save();
    console.log("curr stock data inserted");
    //total stock
    await TotalStockData.save();
    console.log("total stock data inserted");
    //Add bill for credit loan
    if (req.body.newStockData.paymentType === "credit") {
      await creditData.save();
      console.log("loan data inserted");
    }
    res.send("Data Inserted");
  } catch (err) {
    console.log(err);
    res.send("userName already exist");
  }
};

const findStockData = async (req, res) => {
  console.log(req.query.userId);
  const currUserStockData = await Stock.find({
    userId: req.query.userId,
  });
  if (currUserStockData) res.send(currUserStockData);
  else {
    res.send("no user found");
  }
};

const addBillFunc = async (req, res) => {
  const allBillData=req.body;

  for(let i=0;i<allBillData.length;i++){
    const currBillObj=allBillData[i];
    
    const currMedBill = await CurrStockM.find({
      userid: currBillObj.userid,
      productname: currBillObj.medicinename,
      exp: currBillObj.exp,
    });
    // console.log(currMedBill);
    if (Number(currMedBill[0].quantity) > Number(currBillObj.quantity)) {
      const BillData = new Bill({
        userid: currBillObj.userid,
        customername: currBillObj.customername,
        phonenumber: currBillObj.phonenumber,
        medicinename:currBillObj.medicinename,
        quantity: currBillObj.quantity,
        price:currBillObj.price,
        date:currBillObj.date,
        exp: currBillObj.exp,
        // type: currBillObj.type,
        // pack: currBillObj.pack,
        // mrp: currBillObj.mrp,
        // finalDiscount: currBillObj.finalDiscount,
        // gst: currBillObj.gst,
        // batchNo: currBillObj.batchNo,
        // customerName: currBillObj.customerName,
        // customerLocation: currBillObj.customerLocation,
        // saleDate: currBillObj.saleDate,
        // diseaseType: currBillObj.diseaseType,
        // loyaltyPoints: currBillObj.loyaltyPoints,
        // refillReminder: currBillObj.refillReminder,
        // isPrescribed: currBillObj.isPrescribed,
        // billPreferance: currBillObj.billPreferance,
        // doctorName: currBillObj.doctorName,
        // invoiceNumber: currBillObj.invoiceNumber,
        // address: currBillObj.address,
        // doctorDiscount: currBillObj.doctorDiscount,
      });
      try {
        await BillData.save();
        console.log("data inserted");
        const filter = {
          userid: currBillObj.userid,
          productname: currBillObj.medicinename,
          exp: currBillObj.exp,
        };
        let finalQuantity =
          Number(currMedBill[0].quantity) - Number(currBillObj.quantity);
        const update = { quantity: finalQuantity.toString() };
        let doc = await CurrStockM.findOneAndUpdate(filter, update, {
          new: true,
        });
        console.log("stock Updated");
      } catch (err) {
        console.log(err);
        res.send("bill already exist");
      }
    } else {
      res.send("not enough quantity");
    }
  }
  // console.log(req.query.userId);
};


const lessQuantity = 10;
const findLessStockData = async (req, res) => {
  const currUserStockData = await CurrStockM.find({
    userid: req.query.userId,
  });
  let lessStockData = [];
  for (let i = 0; i < currUserStockData.length; i++) {
    if (Number(currUserStockData[i].currentstock) <= lessQuantity) {
      lessStockData.push(currUserStockData[i]);
    }
  }

  res.send(lessStockData);
};


const expiryBufferTime = 3 * 24 * 60 * 60; //3days
const findSoonExpiryStockData = async (req, res) => {
  const currUserStockData = await CurrStockM.find({
    userid: req.query.userId,
  });
  let expiryStockData = [];
  for (let i = 0; i < currUserStockData.length; i++) {
    let t =
      (new Date(currUserStockData[i].exp).getTime() - new Date().getTime()) /
      1000;
    if (t <= expiryBufferTime) {
      expiryStockData.push(currUserStockData[i]);
    }
  }
  res.send(expiryStockData);
};


const findBill = async (req, res) => {
  const currUserBillData = await Bill.find({
    userid: req.query.userId,
  });
  if (currUserBillData) res.send(currUserBillData);
  else {
    res.send("no bill data found");
  }
};
const findMedData = async (req, res) => {
  const medData = [nameList, purchasePriceList, batchList, expList];
  res.send(medData);
};
const uploadImageFunc = async (req, res) => {
  // console.log(req.file, req.body);
  const imageUrl = req.file.path;
  if (!imageUrl) {
    return res.send({ code: 400, message: "bad request" });
  }
  const newImage = new ImageM({
    imageUrl: imageUrl,
    userId: req.query.userId,
  });
  let result = await newImage.save();
  if (result) {
    console.log("photo uploaded");
  }
};
const imageData = async (req, res) => {
  const imgData = await ImageM.find({ userId: req.query.userId });
  if(imgData[0])
    res.send(imgData[0].imageUrl);
};
const creditData = async (req, res) => {
  const creditInfo = await CreditM.find({ userId: req.query.userId });
  res.send(creditInfo);
};
const uploadDataFileFunc = async (req, res) => {
  try {
    const path = req.file.path;
    let workbook = XLSX.readFile(path);
    let sheet_name_list = workbook.SheetNames;
    let jsonData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );
    for(let i=0;i<jsonData.length;i++){
      jsonData[i].userId=req.query.userid
      jsonData[i].id=i;
      jsonData[i]['productname'] = jsonData[i]['Product Name'];
      delete jsonData[i]['Product Name'];
      jsonData[i]['unit'] = jsonData[i]['Unit'];
      delete jsonData[i]['Unit'];
      jsonData[i]['currentstock'] = jsonData[i]['Current Stock'];
      delete jsonData[i]['Current Stock'];
      jsonData[i]['costprice'] = jsonData[i]['Cost Price'];
      delete jsonData[i]['Cost Price'];
      jsonData[i]['mrp'] = jsonData[i]['M.R.P.'];
      delete jsonData[i]['M.R.P.'];
      jsonData[i]['purchaseprice'] = jsonData[i]['Purchase Price'];
      delete jsonData[i]['Purchase Price'];
      jsonData[i]['salesprice'] = jsonData[i]['Sales Price'];
      delete jsonData[i]['Sales Price'];
      jsonData[i]['company'] = jsonData[i]['Company'];
      delete jsonData[i]['Company'];
      jsonData[i]['manufacturer'] = jsonData[i]['Manufacturer'];
      delete jsonData[i]['Manufacturer'];
      jsonData[i]['recdate'] = jsonData[i]['Rec.Date'];
      delete jsonData[i]['Rec.Date'];
      jsonData[i]['batch'] = jsonData[i]['Batch'];
      delete jsonData[i]['Batch'];
      jsonData[i]['mfg'] = jsonData[i]['MFG'];
      delete jsonData[i]['MFG'];
      jsonData[i]['exp'] = jsonData[i]['EXP'];
      delete jsonData[i]['EXP'];
      jsonData[i]['supplier'] = jsonData[i]['Supplier'];
      delete jsonData[i]['Supplier'];
      jsonData[i]['invno'] = jsonData[i]['Inv.No'];
      delete jsonData[i]['Inv.No'];
      jsonData[i]['invdate'] = jsonData[i]['Inv.Date'];
      delete jsonData[i]['Inv.Date'];
      jsonData[i]['userid'] = jsonData[i]['userId'];
      delete jsonData[i]['userId'];
      
      // if(i==1)
        // console.log(jsonData[i]);
       let res=await CurrStockM.create(jsonData[i]);
      //  if(res)console.log("data uploaded")
    }
    //array of objects
    // let savedData = await Stock.create(jsonData);
     res.send(200);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const findCurrStock= async (req,res)=>{
  const creditInfo = await Stock.find({ userId: req.query.userId });
  console.log(creditInfo.length);
  // for(let i=0;i<creditInfo.length;i++){
  //   creditInfo[i].id=toString(i);
  // }
  res.send(creditInfo);
}
const currStockFunc=async(req,res)=>{
  console.log(req.query.userId)
  let ress=await CurrStockM.find({userid:req.query.userId});
  res.send(ress);
}
module.exports = {
  findCurrStock,
  addStockFunc,
  findStockData,
  addBillFunc,
  findLessStockData,
  findSoonExpiryStockData,
  findBill,
  findMedData,
  uploadImageFunc,
  imageData,
  creditData,
  uploadDataFileFunc,
  currStockFunc
};
