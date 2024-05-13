const express = require("express");
const connectDB = require("./db");
const dotenv = require("dotenv");
const urlRoutes = require("./routes/urlRoutes");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();

//connecting to DB
connectDB();

app.use(bodyParser.json());

app.use("/", urlRoutes);

//server created
app.listen(process.env.PORT, () => {
  console.log("server is running");
});
