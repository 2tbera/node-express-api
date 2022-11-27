const express = require("express");
const router = express.Router();
const {create, update, remove, getById, getAlbums, getUserAlbums} = require('../controllers/album');
const {use, throwError} = require("../middlewares/error-handler");
const {body} = require("express-validator");

router.get("/getAlbums",
    throwError,
    use(getAlbums));

router.post("/getUserAlbums",
    body('id').isLength({min: 1}),
    throwError,
    use(getUserAlbums));

router.get("/getById",
    body('id').isLength({min: 1}),
    throwError,
    use(getById));

router.post("/create",
    body('name').isLength({min: 1}),
    throwError,
    use(create));

router.put("/update",
    body('id').isLength({min: 1}),
    body('name').isLength({min: 1}),
    throwError,
    use(update));

router.delete("/remove",
    body('id').isLength({min: 1}),
    throwError,
    use(remove));

module.exports = router;
