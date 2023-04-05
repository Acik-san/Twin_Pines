const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(router);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Server message";
  res.status(status).send(message);
});

module.exports = app;
