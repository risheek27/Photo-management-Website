var database = require("../config/database");
const CommentForModel = {};

CommentForModel.create = (userId, postId, comment) => {
    let putSQL = `INSERT INTO comments (comment, fk_postid, fk_authorid) VALUES(?,?,?);`;
    return database.query(putSQL, [comment, postId, userId])
        .then(([results, fields]) => {
            if (results && results.affectedRows) {
              return Promise.resolve(results.insertId);
            } else {
                return Promise.resolve(-1);
            }
        })
        .catch((err) => Promise.reject(err));
}

CommentForModel.getCommentForPost = (postId) => {
    let putSQL = `SELECT u.username, c.comment, c.created, c.id FROM comments c JOIN users u on u.id=fk_authorid 
    WHERE c.fk_postid=? ORDER BY c.created DESC`
    return database.query(putSQL, [postId])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch(err => Promise.reject(err));
};
module.exports = CommentForModel;