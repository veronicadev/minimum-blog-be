const User = require('./../models/user');
const { validationResult } = require('express-validator/check');
const utils = require('./../utils/utils');
const bcryptjs = require('bcryptjs');

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
