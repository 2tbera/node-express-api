const User  = require('../models/auth')
const JWT  = require('jsonwebtoken')

/**
 * @description Authorization guard, checks is authorization
 * token is valid or not and is this user in MYSQL DB , 
 * if user exists it's adds req Object user parameter
 * with user data from DB
*/   

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
