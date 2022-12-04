const express = require("express");
const router = express.Router();
const {userData} = require('../controllers/user');
const {use} = require("../middlewares/error-handler");

/**
 * @description API user Route @header authorization
    * @userData GET
*/

router.get("/user-data", use(userData));

module.exports = router;
