const errorHandlerMW = async (err, req, res, next) => {
  console.log(err);
  
  return res.status(500).json(  );
};

module.exports = errorHandlerMW;
