const express = require("express");
const router = express.Router();
const {upload, getFiles} = require('../controllers/file');
const {use} = require("../middlewares/error-handler");
const {uploadMG} = require("../core/databaseConfig");


router.post("/upload",
    uploadMG.single('file'),
    use(upload));

router.get("/files/:filename",
    use(getFiles));

module.exports = router;
