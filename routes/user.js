const express = require('express');
const { body, check } = require('express-validator/check');
const router = express.Router();
const userController = require('../controllers/user');
const isAuth = require('./../middlewares/is-auth');

router.get('/user/:userId/posts', userController.getPosts);
router.get('/user/:userId', userController.getUser);
module.exports = router;