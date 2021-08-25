const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UnauthorizedError = require("../errors/unauthorized");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Неправильный формат почты",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  return bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch(next);
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((u) => {
      if (!u) {
        throw new UnauthorizedError("Неверный логин или пароль.");
      }

      return bcrypt.compare(password, u.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError("Неверный логин или пароль.");
        }
        return u;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
