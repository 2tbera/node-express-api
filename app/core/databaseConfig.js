const mysql = require('mysql');

config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: process.env.NODE_PROJECT
}

const connection = mysql.createConnection(config);
connection.connect((err) => {
    if (err){
        console.log('Error connecting:' + err.stack);
    }
    console.log('Connected successfully to MySql DB.');
});

module.exports ={
    connection : mysql.createConnection(config)
}
