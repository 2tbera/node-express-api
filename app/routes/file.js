const express = require("express");
const router = express.Router();
const {upload, getFiles} = require('../controllers/file');
const {use, throwError} = require("../middlewares/error-handler");
const {uploadMG} = require("../core/databaseConfig");
const { header } = require("express-validator");
const { authGuard } = require("../middlewares/auth-guard");

/**
 * @description API file Route 
    * @upload POST upload @header authorization @body file
    * @files GET
    *   @filename @params filename
*/

router.post("/upload",
    header('authorization').isLength({min: 1}),
    throwError,
    use(authGuard),
    uploadMG.single('file'),
    use(upload));

router.get("/files/:filename",
    use(getFiles));

module.exports = router;
