const uuid = require("uuid");
const Music = require('../models/music');

const create = async (req, res) => {
    const music = new Music({id: uuid.v4(), user_id: res.user.id, name: req.body.name, category: req.body.category, file: req.body.file})
    await Music.create(music)
    return music
};

const upload = async (req, res) => {
    if(req.files) {
        console.log(req.files.foo); // the uploaded file object
    }
    res.json({})
};

const update = async (req, res) => {
    const album = await Music.getById(req.body.id)
    if (!album) {
        throw {status: 404, message: 'album_not_found'}
    }
    const updatedAlbum = new Music({id: req.body.id, name: req.body.name})
    const x = await Music.update(updatedAlbum)

    res.json(x)
};

const remove = async (req, res) => {
    const album = await Music.getById(req.body.id)
    if (!album) {
        throw {status: 404, message: 'album_not_found'}
    }
    const x  = await Music.remove({id: req.body.id, status: false})
    res.json({id: req.body.id})
};

const getById = async (req, res) => {
    const album = await Music.getById(req.body.id)
    if (!album) {
        throw {status: 404, message: 'album_not_found'}
    }
    res.json(album)
};

module.exports = {
    upload,
    getById,
    create,
    update,
    remove
}
