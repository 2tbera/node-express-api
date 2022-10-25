const {validationResult} = require("express-validator");
const  ErrorHandler = (error, req, res, next) =>  {
    res.status(error.status || 500).send({error: true, message: error.message || 'Internal Server Error'})
}
const throwError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw {status: 400, message: errors.array()}
    }
    next()
}

const use = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = {ErrorHandler, use, throwError};
