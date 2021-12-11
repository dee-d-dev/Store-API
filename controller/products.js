const getAllProductsStatic = (req, res) => {
  res.status(200).send("Testing static products");
};

const getAllProducts = (req, res) => {
  res.status(200).json({ msg: `Products ready` });
};

module.exports = { getAllProducts, getAllProductsStatic };
