const {getConnection} = require('../core/databaseConfig');
const connection = getConnection();

function Album(album) {
    this.id = album.id;
    this.name = album.name
    this.user_id = album.user_id
}

Album.create = (album) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO album set ?`,album , (err, res) => {
            if (err) {
                reject({status: 404});
                return
            }
            resolve(res);
        });
    });
};

Album.addMusic = (album_music) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO album_music set ?`, album_music , (err, res) => {
            if (err) {
                reject({status: 404});
                return
            }
            resolve(res);
        });
    });
};

Album.update = (data) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE album SET name=? WHERE id=?", [data.name, data.id], (err, res) => {
            if (err) {
                reject({status: 404, message: 'Album Not Found'});

            }
            resolve(res || null);
        });
    })
};

Album.remove = (data) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE album SET status=? WHERE id=?", [data.status, data.id], (err, res) => {
            if (err) {
                reject({status: 404, message: 'Album Not Found'});
            }
            resolve(res || null);
        });
    })
};

Album.getById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM album WHERE id=? AND status=true", id , (err, res) => {
            if (err) {
                reject({status: 404, message: 'Album Not Found'});
            }
            resolve(res[0] || null);
        });
    })
};

Album.getAlbumMusicById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM nodeProject.album INNER JOIN nodeProject.album_music ON nodeProject.album.id = nodeProject.album_music.album_id INNER JOIN nodeProject.music ON nodeProject.music.id = nodeProject.album_music.music_id WHERE nodeProject.album.id=? ", id , (err, res) => {
            if (err) {
                reject({status: 404, message: 'Album Not Found'});
            }
            resolve(res || null);
        });
    })
};

Album.getAlbums = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM album WHERE status=true" , (err, res) => {
            if (err) {
                reject({status: 404, message: 'Album Not Found'});
            }
            resolve(res || null);
        });
    })
};

Album.getUserAlbums = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM album WHERE user_id=? AND status=true", id , (err, res) => {
            if (err) {
                reject({status: 404, message: 'Album Not Found'});
            }
            resolve(res || null);
        });
    })
};

module.exports = Album;
