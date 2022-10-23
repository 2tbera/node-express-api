"user strict";

const config = require('../core/databaseConfig');
const connection = config.connection;

const User = function (user) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.age = user?.age;
    this.createdAt = new Date();
    this.updatedAt = new Date();
};

User.create = (user, result) =>  {
    connection.query("INSERT INTO users set ?", user, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};

User.getById = function (email, result) {
    connection.query(`SELECT * FROM users WHERE email=?`,email, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

User.read = function (result) {
    connection.query("SELECT * FROM users", (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = User;
