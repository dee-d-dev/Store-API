const getAllProductsStatic = async (req, res) => {
  // throw new Error('testing async errors');
  res.status(200).json({msg:"Testing static products"});
};

const getAllProducts = async(req, res) => {
  res.status(200).json({ msg: `Products ready` });
};

module.exports = { getAllProducts, getAllProductsStatic };
