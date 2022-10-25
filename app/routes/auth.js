const express = require("express");
const router = express.Router();
const {
    logIn,
    registration,
    refreshTokens,
} = require("../controllers/auth");
const { body, header, validationResult } = require('express-validator');
const {use} = require("../middlewares/error-handler");

const errorhandler = (req,res, next ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw {status: 400 , message: errors.array()}
    }
    next()
}

router.post("/login",
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    errorhandler,
    use(logIn));

router.post("/registration",
    body('firstname').isString(),
    body('firstname').isLength({ min: 1 }),
    body('lastname').isString(),
    body('lastname').isLength({ min: 1 }),
    body('age').isInt(),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    errorhandler,
    use(registration));

router.get("/refresh-token",
    header('refreshToken').isLength({min: 1}),
    errorhandler,
    use(refreshTokens));

module.exports = router;
