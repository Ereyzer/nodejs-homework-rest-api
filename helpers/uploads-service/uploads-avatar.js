const multer = require("multer");
const { CustomError, ErrorTypes } = require("../errorHandler");
const { HttpCode } = require("../../config/constants");

const { UPLOAD_DIR } = require("../../config/dotenv-info");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      console.log(11111111);
      return cb(null, true);
    }

    cb(
      new CustomError(
        HttpCode.BAD_REQUEST,
        "Wrong format avatar",
        ErrorTypes.WRONG_AVATAR
      )
    );
  },
});

module.exports = upload;
