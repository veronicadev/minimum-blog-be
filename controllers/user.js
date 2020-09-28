const { validationResult } = require('express-validator');
const Post = require('../models/post');
const User = require('../models/user');
const utils = require('./../utils/utils');
const io = require('./../utils/socket');
const mongoose = require('mongoose')
const ITEMS_PER_PAGE = 6;


exports.getUser = async (req, res, next) => {
    const userId = req.params.userId;
    if (!userId) {
        const error = new Error('Param userId is missing');
        error.statusCode = 400;
        throw error;
    }
    try {
        const user = await User.findOne({_id: userId})
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

exports.getPosts = async (req, res, next) => {
    const userId = req.params.userId;
    if (!userId) {
        const error = new Error('Param userId is missing');
        error.statusCode = 400;
        throw error;
    }
    const currentPage = req.params.page || 1;
    try {
        const totalItems = await Post.find({creator: userId}).countDocuments()
        const posts = await Post.find({creator: userId})
            .skip((currentPage - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);
        res.status(200).json({
            posts: posts,
            totalItems: totalItems,
            totalPages: Math.ceil((totalItems / ITEMS_PER_PAGE))
        });
    } catch (err) {
        next(err);
    }
}