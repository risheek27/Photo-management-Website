const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'photoapp',
    password: '', //password of database
    database: '', //name of database
    //debug: true,

});

const promisePool = pool.promise();

module.exports = promisePool;
