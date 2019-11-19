const User = require('./../models/user');
const { validationResult } = require('express-validator/check');
const utils = require('./../utils/utils');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.postSignup = (req, res, next) =>{
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
        const error = new Error(utils.getValidationMessage(valErrors));
        error.statusCode = 422;
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    bcryptjs.hash(password, 12)
    .then(hashPsw => {
        const user = new User({
            name: name,
            email: email,
            password: hashPsw,
        });
        return user.save();
    })
    .then(user => {
        res.status(200).json({
            message: 'User signup successfully'
        })
    })
    .catch(error => {
        next(err);
    })
}

exports.postLogin = (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({email:email})
        .then(user=>{
            if(!user){
                const error = new Error('User with this email address could not be found!');
                error.statusCode = 400;
                throw error;
            }
            loadedUser = user;
            return bcryptjs.compare(password, user.password);
        })
        .then(isEqual=>{
            if(!isEqual){
                const error = new Error('Wrong password entered');
                error.statusCode = 400;
                throw error;
            }
            const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            }, JWT_SECRET, {
                expiresIn: '2h'
            });
            res.status(200).json({
                token: token,
                userId: loadedUser._id.toString()
            })
        })
        .catch(err=>{
            next(err);
        })
}