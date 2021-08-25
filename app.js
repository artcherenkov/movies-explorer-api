const express = require("express");
const mongoose = require("mongoose");

const router = require("./routes");

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/bitfilmsdb";

const app = express();
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use("/", router);

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
