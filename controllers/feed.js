const { validationResult } = require('express-validator/check');
const Post = require('../models/post');
const utils = require('./../utils/utils');

exports.getPosts = (req, res, next) => {
    console.log('Get posts');
    Post.find({}, 'title content imageUrl createdAt')
    .then(posts=>{        
        res.status(200).json(posts)
    })
    .catch(err=>{
        if(!err.statusCode){
            err.httpStatus = 500;
        }
        next(err);
    })
}

exports.postPost = (req, res, next) => {
    const valErrors = validationResult(req);
    if(!valErrors.isEmpty()){
        const error = new Error(utils.getValidationMessage(valErrors));
        error.statusCode = 422;
        throw error;
    }
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl
    });
    newPost.save()
    .then((resPost)=>{
        res.status(201).json({
            message: "Post added successfully!",
            post: resPost
        });
    })
    .catch((err)=>{
        if(!err.statusCode){
            err.httpStatus = 500;
        }
        next(err);
    })
}

exports.getPost = (req, res, next)=>{
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post =>{
            if(!post){
                const error = new Error("Can't find a post");
                error.statusCode = 400;
                throw error;
            }
            res.status(200).json(post)
        })
        .catch(err=>{
            if(!err.statusCode){
                err.httpStatus = 500;
            }
            next(err);
        })
}