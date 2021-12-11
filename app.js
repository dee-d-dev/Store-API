const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
const notFound = require("./middlewares/not-found");
const errorHandlerMW = require("./middlewares/errorHandlerMiddleware");
const products = require("./routes/products");

app.use(express.json());

//home screem
app.get("/", (req, res) => {
  res.send(
    `<h1>Welcome to store API</h1><a href="/api/v1/products">Product routes</a>`
  );
});

//routes
app.use("/api/v1/products", products);

//middlewares
app.use(notFound);
app.use(errorHandlerMW);

const PORT = process.env.PORT || 7000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`running on ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
