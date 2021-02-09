var database = require("../config/database");
const PostForModel = {};

PostForModel.create = () => {

};

PostForModel.search = (search) => {

};

PostForModel.getNRecentPosts = (numberOfPost) => {
    let putSQL = 'SELECT id, title, description, thumbnail, created FROM posts ORDER BY created DESC LIMIT ?';
    return database.execute(putSQL, [])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
};

PostForModel.getPostById = (postId) => {
    let putSQL = `SELECT u.username, p.title, p.description, p.photopath, p.created 
     FROM users u 
     JOIN posts p 
     ON u.id=fk_userid 
    WHERE p.id = ?;`;

    

    return database.execute(putSQL, [postId])
        .then(([results, fields]) => {
            
                 return Promise.resolve(results);
          
        })
    .catch(err => Promise.reject(err))
}

module.exports = PostForModel;