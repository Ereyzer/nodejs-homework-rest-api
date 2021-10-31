const mongoose = require("mongoose");

const { URI_DB, URI_DB_TEST, NODE_ENV } = require("./dotenv-info");
let uri;

if (NODE_ENV === "test") {
  uri = URI_DB_TEST;
} else {
  uri = URI_DB;
}

const db = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error ${err.message}`);
  process.exit(1);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Connection to DB closed");
  process.exit();
});

module.exports = db;
