const errorHandlerMW = (req, res) =>{
    res.status(500).json({msg: 'This is from us not you'})
}

module.exports = errorHandlerMW