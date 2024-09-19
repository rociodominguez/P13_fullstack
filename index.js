require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./src/config/database");
const userRouter = require("./src/api/routes/UserRoutes");
const bookRouter = require("./src/api/routes/BookRoutes");

connectDB()

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);

app.use("*", (req, res, next) => {
    return res.status(404).json("Sorry! Route not found 💔");
});

app.listen(8080, () => {
  console.log("http://localhost:8080 💚");
});