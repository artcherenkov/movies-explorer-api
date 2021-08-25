const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.status(201).send({ message: "Hello world" });
});

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
