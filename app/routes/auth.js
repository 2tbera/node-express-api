const express = require("express");
const router = express.Router();
const {
    logIn,
    registration,
    refreshTokens,
} = require("../controllers/auth");
const { body, header, validationResult } = require('express-validator');

const errorhandler = (req,res, next ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next()
}

router.post("/login",
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    errorhandler,
    logIn);

router.post("/registration",
    body('firstname').isString(),
    body('firstname').isLength({ min: 1 }),
    body('lastname').isString(),
    body('lastname').isLength({ min: 1 }),
    body('age').isInt(),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    errorhandler,
    registration);


router.post("/refresh-token",
    header('refreshToken').isLength({min: 1}),
    errorhandler,
    refreshTokens);

module.exports = router;
