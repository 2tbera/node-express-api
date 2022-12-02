const {getConnection} = require('../core/databaseConfig');
const connection = getConnection();

function Music(music) {
    this.id = music.id;
    this.name = music.name;
    this.user_id = music.user_id;
    this.file = music.file;
    this.category = music.category;
}

Music.create = (music) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO music set ?`,music , (err, res) => {
            if (err) {
                reject({status: 404, message: 'Error'});
                return
            }
            resolve(res);
        });
    });
};

Music.update = (data) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE music SET name=? WHERE id=?", [data.name, data.id], (err, res) => {
            if (err) {
                reject({status: 404, message: 'Music Not Found'});
                return
            }
            resolve(res || null);
        });
    })
};

Music.remove = (data) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE music SET status=? WHERE id=?", [data.status, data.id], (err, res) => {
            if (err) {
                reject({status: 404, message: 'Music Not Found'});
            }
            resolve(res || null);
        });
    })
};

Music.getById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM music WHERE use_id=? AND status=true", id , (err, res) => {
            if (err) {
                reject({status: 404, message: 'Music Not Found'});
            }
            resolve(res[0] || null);
        });
    })
};

Music.getAlbums = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM music WHERE status=true" , (err, res) => {
            if (err) {
                reject({status: 404, message: 'Music Not Found'});
            }
            resolve(res || null);
        });
    })
};

Music.getUserAlbums = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM music WHERE user_id=? AND status=true", id , (err, res) => {
            if (err) {
                reject({status: 404, message: 'Music Not Found'});
            }
            resolve(res || null);
        });
    })
};

module.exports = Music;
