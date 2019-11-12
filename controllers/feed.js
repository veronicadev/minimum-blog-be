const { validationResult } = require('express-validator/check');
const Post = require('../models/post');
const utils = require('./../utils/utils');
const ITEMS_PER_PAGE = 6;

exports.getPosts = (req, res, next) => {
    const currentPage = req.params.page || 1;
    let totalItems;
    Post.find().countDocuments()
        .then(count => {
            totalItems = count;
            return Post.find({}, 'title content imageUrl createdAt')
                .skip((currentPage-1)*ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE);
        })
        .then(posts => {
            res.status(200).json({
                posts:posts,
                totalItems: totalItems,
                totalPages: Math.ceil((totalItems / ITEMS_PER_PAGE))
            })
        })
        .catch(err => {
            next(err);
        })
}

exports.postPost = (req, res, next) => {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
        const error = new Error(utils.getValidationMessage(valErrors));
        error.statusCode = 422;
        throw error;
    }
    if (!req.file) {
        const error = new Error('Image url in not valid');
        error.statusCode = 422;
        throw error;
    }
    const imageUrl = req.file.path;
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        imageUrl: imageUrl
    });
    newPost.save()
        .then((resPost) => {
            res.status(201).json({
                message: "Post added successfully!",
                post: resPost
            });
        })
        .catch((err) => {
            next(err);
        })
}

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error("Can't find a post");
                error.statusCode = 400;
                throw error;
            }
            res.status(200).json(post)
        })
        .catch(err => {
            next(err);
        })
}
exports.putPost = (req, res, next) => {
    const postId = req.params.postId;
    let imageUrl = req.body.imageUrl;
    const valErrors = validationResult(req);
    if (!postId) {
        const error = new Error('Param PostId is missing');
        error.statusCode = 400;
        throw error;
    }
    if (!valErrors.isEmpty()) {
        const error = new Error(utils.getValidationMessage(valErrors));
        error.statusCode = 422;
        throw error;
    }
    if (req.file) {
        imageUrl = req.file.path;
    }
    if (!imageUrl) {
        const error = new Error('No image');
        error.statusCode = 422;
        throw error;
    }
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error("Can't find a post");
                error.statusCode = 400;
                throw error;
            }
            if (imageUrl !== post.imageUrl) {
                utils.deleteFile(post.imageUrl);
            }
            post.title = req.body.title;
            post.content = req.body.content;
            post.imageUrl = imageUrl;
            return post.save();
        })
        .then((resPost) => {
            res.status(200).json({
                message: "Post updated successfully!",
                post: resPost
            });
        })
        .catch(err => {
            next(err);
        })
}

exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    if (!postId) {
        const error = new Error('Param PostId is missing');
        error.statusCode = 400;
        throw error;
    }
    Post.findById(postId).then(post => {
        if (!post) {
            const error = new Error("Can't find a post");
            error.statusCode = 400;
            throw error;
        }
        utils.deleteFile(post.imageUrl);
        return Post.findByIdAndRemove(postId);
    })
        .then(resPost => {
            res.status(200).json({
                message: "Post deleted successfully!",
                post: resPost
            });
        })
        .catch(error => {
            const newError = new Error(error);
            newError.httpStatusCode = 500;
            return next(newError);
        });
}