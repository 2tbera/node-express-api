const User  = require('../models/auth')
const JWT  = require('jsonwebtoken')

const authGuard = async (req , res , next) => {
    const {aud} = JWT.decode(req.headers.authorization)
    const user = await User.getById(aud)
    if(!user) {
        throw {status: 400, message: 'Invalid Token'}
    }
    res.user = user;
    next()
}

module.exports = {authGuard};
