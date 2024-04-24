const mongoose = require('mongoose');
const validator = require('validator');
const userRole = require('../utility/userRole')
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true,
            trim: true
        },
        lastName: {
            type: String, 
            require: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            trim: true,
            validate: [validator.isEmail, "filed must be a valid email address"]
        },
        password: {
            type: String,
            require: true,
            trim: true
        },
        token: {
            type: String
        },
        role: {
            type: String,
            enum: [userRole.USER, userRole.ADMIN],
            default: userRole.USER
        },
        /*----------------------------------------------------------*/
        // address: {
        //     type: String,
        //     require: true,
           
        // },
        // nationality: {
        //     type: String,
        //     require: true,
           
        // },
        // PassportNumber: {
        //     type: String,
        //     require: true,
           
        // },
        // mobilePhone: {
        //     type: Number,
        //     require: true,
        //    /*----------------------------------------------------------*/
        // },
    }
)
const User = mongoose.model('User', userSchema);

module.exports = User;