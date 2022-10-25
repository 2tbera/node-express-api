const {getConnection} = require('../core/databaseConfig');
const connection = getConnection();

function User(user) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.age = user?.age;
    this.status = true;
}


User.create = (user) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM user WHERE email=?`, user.email, (err, res) => {
            if (err || (res.length && !!res[0].status)) {
                reject(err || 'User Not Found');
                return
            }
            connection.query("INSERT INTO user set ?", user, (err, res) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve(res);
            });
        });
    });
};

User.getByEmail = (email) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM user WHERE email=?`, email, (err, res) => {
            if (err || res.length && !res[0].status) {
                reject(err || 'User Not Found');
            }
            resolve(res);
        });
    })
};

User.getById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT `firstname`, `lastname`, `email`, `password`, `age`, `avatar`, `bio`, `status`, `createAt`, `updatedAt` FROM user WHERE id=? AND status=true", id , (err, res) => {
            if (err || res.length && !res[0].status) {
                reject(err || 'User Not Found');
            }
            resolve(res[0] || null);
        });
    })
};

module.exports = User;
