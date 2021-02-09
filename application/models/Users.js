var bcrypt = require('bcrypt');
var database = require("../config/database");
const UserForModel = {};

UserForModel.create = (username, password, email) => {
    return bcrypt.hash(password, 14)
        .then((hashedPassword) => {
            let putSQL = "INSERT INTO users (username, email, password, created) VALUES (?,?,?,now()); "
            return database.execute(putSQL, [username, email, hashedPassword])

        })
        .then(([results, fields]) => {
            if (results && results.affectedRows) {
                return Promise.resolve(results.insertId);
            } else {
                return Promise.resolve(-1);
            }
        })
        .catch((err) => Promise.reject(err));
}

UserForModel.usernameExists = (username) => {
    return database.execute("SELECT * FROM users WHERE username=?", [username])
        .then(([results, fields]) => {
            return Promise.resolve(!(results && results.length == 0));
        })
        .catch((err) => Promise.reject(err));
}

UserForModel.emailExists = (email) => {
    return database.execute("SELECT * FROM users WHERE email=?",
        [email])
        .then(([results, fields]) => {
            return Promise.resolve(!(results && results.length == 0));
        })
        .catch((err) => Promise.reject(err));
};

UserForModel.authenticate = (username, password) => {
    let userId;
    let putSQL = "SELECT id, username, password FROM users where username=?;";
   return  database.execute(putSQL, [username])
        .then(([results, fields]) => {
            if (results && results.length == 1) {
                userId = results[0].id;
                return bcrypt.compare(password, results[0].password);
            } else {
                return Promise.reject(-1);
            }
        })
        .then((passwordMatch) => {
            if (passwordMatch) {
                 return Promise.resolve(userId);
            } else {
               return Promise.resolve(-1);
            }
        })
        .catch((err) => Promise.reject(err));
};

module.exports = UserForModel;

