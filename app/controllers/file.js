const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const fs = require('fs');

const conn = mongoose.connection;
let gfs;

conn.once('open',() => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})

const upload = async (req, res) => {
    res.json(req.file)
};

const getFiles = async (req, res) => {



    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) return res.status(404).json({ err: 'No files exist' });
        const readstream = gfs.createReadStream(files[0]);
        readstream.pipe(res);
        // return res.json(files);
    });/**/
};

const getReadFile = async (req, res) => {
    console.log(req, res,'req, res')
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) return res.status(404).json({ err: 'No files exist' });
        const readstream = gfs.createReadStream(files[0]);
        readstream.pipe(res);
        // return res.json(files);
    });/**/
};

module.exports = {
    upload,
    getFiles,
    getReadFile
}
