const {getConnection} = require('../core/databaseConfig');
const connection = getConnection();

const User = function (user) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.age = user?.age;
};

User.create = (user) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO user set ?", user, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
};

User.getById = (email) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM user WHERE email=?`, email, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
};

User.read = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM user", (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
};

module.exports = User;
