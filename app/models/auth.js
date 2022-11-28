const {getConnection} = require('../core/databaseConfig');
const connection = getConnection();

function User(user) {
    this.id = user.id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.age = user?.age;
    this.avatar = user.avatar;
    this.bio = user.bio;
    this.status = true;
}

User.create = (user) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM user WHERE email=? AND status=true`, user.email, (err, res) => {
            if (err || res.length ) {
                reject({status: 404, message: err || 'User Already Exists'});
                return
            }
            connection.query("INSERT INTO user set ?", user, (err, res) => {
                if (err) {
                    reject({ message: err});
                    return
                }
                resolve(res);
            });
        });
    });
};

User.getByEmail = (email) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM user WHERE email=? AND status=true`, email, (err, res) => {
            resolve(res);
        });
    })
};

User.getById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM user WHERE id=? AND status=true", id , (err, res) => {
            if (err || res.length && !res[0].status) {
                reject({status: 404, message: err || 'User Not Found'});
            }
            resolve(res[0] || null);
        });
    })
};

module.exports = User;
