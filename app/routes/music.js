const express = require("express");
const router = express.Router();
const {create, update, remove, getById} = require('../controllers/music');
const {use, throwError} = require("../middlewares/error-handler");
const {body} = require("express-validator");

/**
 * @description API music Route @header authorization 
    * @getAlbumsMusic GET @body id
    * @create POST @body name category file
    * @update PUT @body id name
    * @remove DELETE @body id 
*/   

router.get("/getAlbumsMusic",
    body('id').isLength({min: 1}),
    throwError,
    use(getById));

router.post("/create",
    body('name').isLength({min: 1}),
    body('category').isLength({min: 1}),
    body('file').isLength({min: 1}),
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
