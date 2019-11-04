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
        console.log(err)
    })
}

exports.postPost = (req, res, next) => {
    const valErrors = validationResult(req);
    if(!valErrors.isEmpty()){
        res.status(422).json({
            message: utils.getValidationMessage(valErrors)
        })
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
        console.log(err)
    })
}