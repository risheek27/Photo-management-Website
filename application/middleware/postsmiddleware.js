var database = require('../config/database');
const { getCommentForPost } = require("../models/comment")
const { getPostById } = require("../models/Posts");
const postMiddleware = {}

postMiddleware.getRecentPosts = function (req, res, next) {
    let putSQL = 'SELECT id, title, description, thumbnail, created FROM posts ORDER BY created DESC LIMIT 8';
    database.execute(putSQL, [])
        .then(([results, fields]) => {
            res.locals.results = results;
            if (results && results.length == 0) {
                req.flash('error', 'You have not created any posts yet');
            }
            next();
        })
        .catch((err) => next(err));
}

postMiddleware.getPostById = async function(req, res, next) {
    try {
        let postId = req.params.id;
        let results = await getPostById(postId);
        if (results && results.length) {
            res.locals.currentPost = results[0];
            next();
        } else {
            req.flash("error", "Not the post you looking for");
            res.redirect('/');
        }
    } catch (error) {
        next(err);
    }
}

postMiddleware.getCommentById = async function (req, res, next) {
    let postId = req.params.id;
    try {
        let results = await getCommentForPost(postId);
        res.locals.currentPost.comments = results;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = postMiddleware;