class CustomError extends Error {
  constructor(status, message, name = "CustomError") {
    super();
    this.message = message;
    this.status = status;
    this.name = name;
  }
}

module.exports = CustomError;
