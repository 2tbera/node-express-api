const uuid = require("uuid");
const Album = require('../models/album');

const create = async (req, res) => {
    const album = new Album({id: uuid.v4(), user_id: res.user.id, name: req.body.name})
    await Album.create(album)
    res.json(album)
};


const update = async (req, res) => {
    const album = await Album.getById(req.body.id)
    if (!album) {
        throw {status: 403, message: 'album_not_found'}
    }
    const updatedAlbum = new Album({id: req.body.id, name: req.body.name})
    const x = await Album.update(updatedAlbum)

    res.json(x)
};

const remove = async (req, res) => {
    const album = await Album.getById(req.body.id)
    if (!album) {
        throw {status: 403, message: 'album_not_found'}
    }
    const x  = await Album.remove({id: req.body.id, status: false})
    res.json(x)
};

module.exports = {
    create,
    update,
    remove
}
