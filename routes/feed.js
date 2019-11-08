const express = require('express');
const { body, check } = require('express-validator/check');
const router = express.Router();
const feedController = require('../controllers/feed');

router.get('/posts', feedController.getPosts);
router.get('/posts/:postId', feedController.getPost);
router.post('/posts',[
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
router.put('/posts/:postId',[
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
], feedController.putPost);
router.delete('/posts/:postId', feedController.deletePost)
module.exports = router;