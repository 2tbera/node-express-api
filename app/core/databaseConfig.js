const mysql = require('mysql');
const createDB = require('./db.create.schema')
const {createPool} = require("mysql");

const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
}

const pool = createPool(config)

const getConnection = () =>  mysql.createConnection({...config, database: process.env.NODE_PROJECT});

let createDatabase = async () => {
    pool.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.NODE_PROJECT}\`;`, (err) => {
        if (err) {
            console.log({status: 500 , message: "Server Is Down "})
        }
        createDB(pool);
    });
};

module.exports = {
    getConnection,
    createDatabase
}
