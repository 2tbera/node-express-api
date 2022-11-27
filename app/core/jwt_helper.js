const JWT = require('jsonwebtoken')

module.exports = {
    generateSignAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const options = {
                expiresIn: process.env.ACCESS_EXPIRES_IN,
                issuer: 'localhost',
                audience: userId
            };
            const token = JWT.sign({id: userId}, process.env.ACCESS_SECRET_KEY, options);
            resolve(token);
        })
    },
    generateRefreshToken: (userId) => {
        return  new Promise((resolve, reject) => {
            const options = {
                expiresIn: process.env.REFRESH_EXPIRES_IN,
                issuer: 'localhost',
                audience: userId
            };

            const token = JWT.sign({id: userId}, process.env.REFRESH_SECRET_KEY, options);
            resolve(token);
        })
    },
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, payload) => {
                if(err) {
                    reject({status: 500, message: 'token_Invalid'});
                }
                resolve(payload)
            } );
        })
    }
}

