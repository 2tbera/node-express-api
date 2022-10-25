const express = require("express");
const router = express.Router();
const {
    logIn,
    registration,
    refreshTokens,
} = require("../controllers/auth");
const {body, header, validationResult} = require('express-validator');
const {use, throwError} = require("../middlewares/error-handler");

router.post("/login",
    body('email').isEmail(),
    body('password').isLength({min: 5}),
    throwError,
    use(logIn));

router.post("/registration",
    body('firstname').isString(),
    body('firstname').isLength({min: 1}),
    body('lastname').isString(),
    body('lastname').isLength({min: 1}),
    body('age').isInt(),
    body('email').isEmail(),
    body('password').isLength({min: 5}),
    throwError,
    use(registration));

router.get("/refresh-token",
    header('refreshToken').isLength({min: 1}),
    throwError,
    use(refreshTokens));

module.exports = router;
