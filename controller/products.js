const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  // const search = "x";
  const products = await Product.find({ price: { $gt: 30 } }).sort("price");

  // const products = await Product.find({
  //   name: { $regex: search, $options: "i" },
  // });
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  // console.log(queryObject);
  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort();
  }
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  if (numericFilters) {
    const operatorMap = {
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
      ">=": "$gte",
      ">": "$gt",
    };

    const regEx = /\b(<|>|>=|<=|=|<)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["rating", "price"];
    filters = filters.split(",").forEach((item) => {
      // console.log(filters)
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  // console.log(queryObject);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = Number(page - 1) * limit;

  result = result.skip(skip).limit(limit).sort(numericFilters);
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
