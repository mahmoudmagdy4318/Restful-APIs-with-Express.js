const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { json, urlencoded } = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 8000;
const databaseURI = process.env.DATABASEURL;
const BookModel = require("./models/bookmodel");
const bookRouter = require("./routers/bookRouter");

const db = mongoose.connect(databaseURI).then(() => {
  console.log("database connected");
});

app.get("/", (req, res, next) => {
  res.send("Api is Okay!");
});

app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/book", bookRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
