const express = require('express');
const { body, check } = require('express-validator/check');
const router = express.Router();
const User = require('./../models/user');
const authController = require('./../controllers/auth');

router.post('/signup',[
    body('email')
        .isEmail()
        .withMessage('Invalid email address')
        .custom((value, {req})=>{
            return User.findOne({email: value})
                    .then(user =>{
                        if(user){
                            return Promise.reject('Email address already exists');
                        }
                    })
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage('Invalid password'),
    body('name')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage('Invalid Name')
], authController.postSignup);
module.exports = router;