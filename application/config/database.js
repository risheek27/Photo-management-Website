const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'photoapp',
    password: '0403',
    database: 'photoapp-db',
    //debug: true,

});

const promisePool = pool.promise();

module.exports = promisePool;