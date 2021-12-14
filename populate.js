require("dotenv").config();
const connectDB = require("./db/connect");
const ProductModel = require("./models/product");
const jsonProducts = require("./product.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await ProductModel.deleteMany();
    await ProductModel.create(jsonProducts);
    console.log("Population successful");
  } catch (error) {
    console.log(error);
  }
};

start();
