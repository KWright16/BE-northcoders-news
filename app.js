const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const apiRouter = require("./routes/api");
const mongoose = require("mongoose");
const DB_URL =
  process.env.NODE_ENV === "production"
    ? process.env.DB_URL
    : require("./config");

mongoose.connect(DB_URL).then(() => {
  console.log("connected okay!");
});

app.use(bodyParser.json());

// app.use("/api", express.static(__dirname + "/public"));

app.use("/api", apiRouter);

app.use("/*", (req, res, next) => {
  res.status(404).send("Page not found");
});

app.use((err, req, res, next) => {
  if (err.name === "CastError") err.status = 400;
  res.status(err.status).send({ msg: err.msg || "Bad Request" });
  next(err);
});

app.use((err, req, res, next) => {
  if (err instanceof QueryResultError && err.code === noData) {
    res.status(404).send({ msg: "Page Not Found" });
  }
  next(err);
});

module.exports = app;
