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
                reject(err);
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
                reject(err || 'Album Not Found');
            }
            resolve(res || null);
        });
    })
};

Album.remove = (data) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE album SET status=? WHERE id=?", [data.status, data.id], (err, res) => {
            if (err) {
                reject(err || 'Album Not Found');
            }
            resolve(res || null);
        });
    })
};


Album.getById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM album WHERE id=? AND status=true", id , (err, res) => {
            if (err || res.length && !res[0].status) {
                reject(err || 'Album Not Found');
            }
            resolve(res[0] || null);
        });
    })
};

module.exports = Album;