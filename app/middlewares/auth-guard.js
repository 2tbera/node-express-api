const User  = require('../models/auth')
const JWT  = require('jsonwebtoken')

const authGuard = async (req , res , next) => {
    try {
        const token = JWT.verify(req.headers.authorization, process.env.ACCESS_SECRET_KEY);
        const user = await User.getById(token.aud);
        res.user = new User(user);
        next()
    } catch(err) {
        throw {status: 401, message: 'Invalid Token'}
    }
}

module.exports = {authGuard};
