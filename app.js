const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_req, res, next) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
  next();
});

app.use((err, _req, res, _next) => {
  console.error(err.message);
  res
    .status(500)
    .json({
      status: "error",
      code: 500,
      message: "Sorry we have some problems",
    });
});

module.exports = app;
