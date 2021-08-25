const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const auth = require("./middlewares/auth");
const error = require("./middlewares/error");
const router = require("./routes");
const NotFoundError = require("./errors/not-found");
const UnauthorizedError = require("./errors/unauthorized");

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/bitfilmsdb";

const app = express();
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.use("/", router);

app.use(auth, (req) => {
  if (!req.user) {
    throw new UnauthorizedError("Необходима авторизация");
  }
  throw new NotFoundError("Ресурс не найден");
});

app.use(errorLogger);

app.use(error);
app.use(errors());

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
