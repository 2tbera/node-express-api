const express = require("express");
const router = express.Router();
const {
    logIn,
    registration,
    refreshTokens,
} = require("../controllers/auth");
const {body, header} = require('express-validator');
const {use, throwError} = require("../middlewares/error-handler");

/**
 * @description API auth Route 
    * @login POST @body email password
    * @registration POST @body firstname lastname age email password
    * @refreshToken GET @header refreshToken
*/ 

router.post("/login",
    body('email').isEmail(),
    body('password').isLength({min: 5}),
    throwError,
    use(logIn));

router.post("/registration",
    body('firstname').isLength({min: 1}),
    body('lastname').isString(),
    body('lastname').isLength({min: 1}),
    body('age').optional().isInt(),
    body('email').isEmail(),
    body('password').isLength({min: 5}),
    throwError,
    use(registration));

router.get("/refresh-token",
    header('refreshToken').isLength({min: 1}),
    throwError,
    use(refreshTokens));

module.exports = router;
