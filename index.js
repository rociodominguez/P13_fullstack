require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./src/config/database");

connectDB()

const app = express();
app.use(express.json());
app.use(cors());


app.use("*", (req, res, next) => {
    return res.status(404).json("Not found! ❌");
});

app.listen(8080, () => {
  console.log("http://localhost:8080 ✅");
});