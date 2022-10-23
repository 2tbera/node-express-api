const mysql = require('mysql');

config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeProject'
}

const connection = mysql.createConnection(config); //added the line
connection.connect(function(err){
    if (err){
        console.log('Error connecting:' + err.stack);
    }
    console.log('Connected successfully to MySql DB.');
});

module.exports ={
    connection : mysql.createConnection(config)
}
