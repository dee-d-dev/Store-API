const errorHandlerMW = async (err, req, res, next) => {
  console.log(err);
  return res.status(500).json({ msg: "This is from us not you" });
};

module.exports = errorHandlerMW;
