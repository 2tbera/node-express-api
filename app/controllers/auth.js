const uuid = require("uuid");
const bcrypt = require('bcryptjs');
const User = require('../models/auth');
const {generateSignAccessToken, generateRefreshToken, verifyRefreshToken} = require('../core/jwt_helper');
const saltRounds = 10;

const returnTokens = async (id, res) => {
    const accessToken = await generateSignAccessToken(id);
    const refreshToken = await generateRefreshToken(id);
    res.json({accessToken, refreshToken})
}

const logIn = async (req, res) => {
    const user = await User.getByEmail(req.body.email)
    if (!user.length) {
        throw {status: 404, message: 'user_not_found'}
    }
    const status = await bcrypt.compare(req.body.password, user[0].password);
    if (status) {
        await returnTokens(user[0].id, res)
    } else {
        throw {status: 404, message: 'password_incorrect'}
    }
};

const registration = async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    let user = new User(req.body);
    user = {...user, id: uuid.v4(), password: hash};
    await User.create(user)
    await returnTokens(user.id, res);
};

const refreshTokens = async (req, res) => {
    const user = await verifyRefreshToken(req.headers.refreshtoken);
    await returnTokens(user.aud, res);
};

module.exports ={
    logIn,
    registration,
    refreshTokens,
}
