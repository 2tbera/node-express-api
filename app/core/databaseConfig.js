const mysql = require('mysql');
const createDB = require('./db.create.schema')
const {createPool} = require("mysql");

const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require('path');

/**
 * @description mysqldb connection
 */

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
            console.log({status: 500 , message: {err , errr:"Server Is Down "}})
            return
        }
        createDB(pool);
    });
};

/**
 * @description mongodb connection
 */

const mongoURI = 'mongodb://root:root@mongo:27017'

const promise = mongoose.connect(mongoURI, { useNewUrlParser: true });

const storage = new GridFsStorage({
    db: promise,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const uploadMG = multer({ storage });

module.exports = {
    getConnection,
    createDatabase,
    uploadMG,
}