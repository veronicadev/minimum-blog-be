const userStatus = require('./../utils/utils').userStatus;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    status: {
        type: String,
        default: userStatus.NEW
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);