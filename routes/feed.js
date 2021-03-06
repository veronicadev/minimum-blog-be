const express = require('express');
const { body, check } = require('express-validator');
const router = express.Router();
const feedController = require('../controllers/feed');
const isAuth = require('./../middlewares/is-auth');

router.get('/posts', feedController.getPosts);
router.get('/posts/feed',isAuth, feedController.getFeed);
router.get('/posts/:postId', feedController.getPost);
router.post('/posts', isAuth, [
    body('title')
        .isString()
        .trim()
        .isLength({ min: 5 })
        .withMessage('Invalid post title'),
    body('content')
        .isString()
        .trim()
        .isLength({ min: 5 })
        .withMessage('Invalid post content'),
    body('excerpt')
        .isString()
        .trim()
        .isLength({ min: 2 })
        .withMessage('Invalid post excerpt')
], feedController.postPost);
router.put('/posts/:postId',isAuth, [
    body('title')
        .isString()
        .trim()
        .isLength({ min: 5 })
        .withMessage('Invalid post title'),
    body('content')
        .isString()
        .trim()
        .isLength({ min: 5 })
        .withMessage('Invalid post content'),
    body('excerpt')
        .isString()
        .trim()
        .isLength({ min: 2 })
        .withMessage('Invalid post excerpt')
], feedController.putPost);
router.delete('/posts/:postId',isAuth, feedController.deletePost);
module.exports = router;