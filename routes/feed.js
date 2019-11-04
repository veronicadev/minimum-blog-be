const express = require('express');
const { body, check } = require('express-validator/check');
const router = express.Router();
const feedController = require('../controllers/feed');

router.get('/posts', feedController.getPosts);
router.post('/post',[
    body('title')
        .isString()
        .trim()
        .escape()
        .isLength({ min: 5 })
        .withMessage('Invalid post title'),
    body('content')
        .isString()
        .trim()
        .escape()
        .isLength({ min: 5 })
        .withMessage('Invalid post content'),
    body('imageUrl')
        .isURL()
        .withMessage('Invalid image url')
], feedController.postPost);
module.exports = router;