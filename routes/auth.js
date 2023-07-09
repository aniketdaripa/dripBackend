const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/", authController.handleLogin);
// router.post("/", authController.addStockFunc);
// router.get("/getAllStockData", authController.findStockData);
// router.post("/addBillPost", authController.addBillFunc);

module.exports = router;
