const  ErrorHandler = (error, req, res, next) =>  {
    res.status(error.status || 500).send({error: true, message: error.message || 'Internal Server Error'})
}

const use = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = {ErrorHandler, use};
