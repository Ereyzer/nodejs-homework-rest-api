const { Schema, model } = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const SECRET_KEY = process.env.SECRET_KEY;
const SALT_FACTOR = +process.env.SALT_FACTOR;

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "noname",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret.email;
        delete ret.password;
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  console.log(SALT_FACTOR);
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(SALT_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const UserModel = new model("user", userSchema);

module.exports = UserModel;
