const express = require("express");
const router = express.Router();
const {upload, getReadFile} = require('../controllers/file');
const {use} = require("../middlewares/error-handler");
const {uploadMG} = require("../core/databaseConfig");


router.post("/upload",
    uploadMG.single('file'),
    use(upload));

router.get("/files/:filename",
    use(getReadFile));

module.exports = router;
