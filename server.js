const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/", urlRoutes);

/*
Server starts on port 5000
*/

app.listen(5000, () => {
    console.log("Server running on port 5000");
});