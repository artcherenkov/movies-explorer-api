const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/bitfilmsdb";

const app = express();
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.get("/", (req, res) => {
  res.status(201).send({ message: "Hello world" });
});

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
