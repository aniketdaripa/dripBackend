require("dotenv").config();
const express = require("express");
const router = express.Router();
const app = express();
const path = require("path");
var cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const authController = require("./controllers/authController");
const controllers = require("./controllers/controllers");
const PORT = process.env.PORT || 3500;
const multer=require("multer")
const upload=multer({dest:'uploads/'})
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
// app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/uploads",express.static("uploads"))

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(router.post("/addStockPost", controllers.addStockFunc));
app.use(router.get("/getAllStockData", controllers.findStockData));
app.use(router.post("/addBillPost", controllers.addBillFunc));
app.get(router.get("/lessStockData", controllers.findLessStockData));
app.get(router.get("/soonExpiryStock", controllers.findSoonExpiryStockData));
app.get(router.get("/getAllBillData", controllers.findBill));
app.get(router.get("/getAllMedData", controllers.findMedData));
app.use(router.post("/uploadImage", upload.single('image'), controllers.uploadImageFunc));
app.get(router.get("/getImageData", controllers.imageData));
app.get(router.get("/getCreditData", controllers.creditData));
app.use(router.post("/uploadImportData", upload.single('dataFile'), controllers.uploadDataFileFunc));
app.get(router.get("/getCurrStock", controllers.findCurrStock));
app.get(router.get("/currStockData", controllers.currStockFunc));






app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));
app.use("/users", require("./routes/api/users"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
