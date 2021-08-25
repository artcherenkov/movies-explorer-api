const jwt = require("jsonwebtoken");
const User = require("../models/user");

const BadRequestError = require("../errors/bad-request");
const ConflictError = require("../errors/conflict");

const { JWT_SECRET = "super-strong-secret" } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((u) => {
      const token = jwt.sign({ _id: u._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res
        .cookie("jwt", token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: "Вы успешно вошли в свой аккаунт." });
    })
    .catch(next);
};
module.exports.createUser = (req, res, next) => {
  User.create({ ...req.body })
    .then((u) => {
      const createdUser = u;
      delete createdUser._doc.password;

      res.status(201).send({ data: createdUser });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequestError(
            "При создании пользователя переданы некорректные данные."
          )
        );
      }
      if (err.name === "MongoError" && err.code === 11000) {
        next(
          new ConflictError("Пользователь с таким email уже зарегистрирован.")
        );
      }
    });
};
module.exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(201).send({ message: "Вы успешно вышли из своего аккаунта." });
};
