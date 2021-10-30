const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/contacts/api/contacts");
const usersRouter = require("./routes/users/api/users");
const { wrapperError } = require("./helpers/errorHandler");
const helmet = require("helmet");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((_req, res, next) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
  next();
});

app.use((err, _req, res, _next) => {
  console.error(err.message);
  res.status(500).json({
    status: "error",
    code: 500,
    message: "Sorry we have some problems",
  });
});

module.exports = app;
