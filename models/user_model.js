const mongoos = require('mongoose');
const validator = require('validator');
const userRole = require('../utility/userRole');
const userSchema = new mongoos.Schema(
    {
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            validate: [validator.isEmail, "filed must be a valid email address"]
        },
        password: {
            type: String,
            require: true
        },
        token: {
            type: String
        },
        role: {
            type: String,
            enum: [userRole.USER, userRole.ADMIN],
            default: userRole.USER
        },
    }
)
module.exports = mongoos.model('User', userSchema)