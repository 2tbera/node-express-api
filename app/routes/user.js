const express = require("express");
const router = express.Router();
const {userData} = require('../controllers/user');
const {use} = require("../middlewares/error-handler");

router.get("/user-data", use(userData));

module.exports = router;
