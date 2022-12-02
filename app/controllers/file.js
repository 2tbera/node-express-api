const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

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
    gfs.files.find({ filename : req.params.filename}).toArray((err, files) => {
        if (!files || files.length === 0) return res.status(404).json({ err: 'No files exist' });
        const read_stream = gfs.createReadStream(files[0]);
        read_stream.pipe(res);
    });
};

module.exports = {
    upload,
    getFiles
}
