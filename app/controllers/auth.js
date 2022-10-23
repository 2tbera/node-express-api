const uuid = require("uuid");
const bcrypt = require('bcrypt');
const User = require('../models/auth');
const {generateSignAccessToken, generateRefreshToken, verifyRefreshToken} = require('../core/jwt_helper');
const saltRounds = 10;

const returnTokens = async (id, res) => {
    const accessToken = await generateSignAccessToken(id);
    const refreshToken = await generateRefreshToken(id);
    const cookieOptions = {
        expiresIn: new Date(new Date() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 ^ 1000),
        HttpOnly: true
    };
    res.cookie('accessToken', accessToken, cookieOptions)
    res.cookie('refreshToken', refreshToken, cookieOptions)
    res.json({accessToken, refreshToken})
}


exports.logIn = async (req, res) => {
    User.getById(req.body.email, (err, user) => {
        if (err || !user.length) {
            return res.status(403).send('user_not_found');
        }
        bcrypt.compare(req.body.password, user[0].password, async (err, result) => {
            if (result) {
                await returnTokens(user[0].id, res)
            } else {
                return res.status(403).send('password_incorrect');
            }
        });
    });

};

exports.registration = async (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        let user = new User(req.body);
        user = {id: uuid.v4(), password: hash, ...user};
        User.create(user, async (err, insertId) => {
            if (err) {
                return res.status(403).send(err);
            }
            await returnTokens(user.id, res);
        });
    });
};

exports.refreshTokens = async (req, res) => {
    verifyRefreshToken(req.headers.refreshtoken).then(async (user) => {
        await returnTokens(user.aud, res);
    }).catch(err => {
        return res.status(403).send(err);
    });
};

