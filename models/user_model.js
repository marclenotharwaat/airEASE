const mongoose = require('mongoose');
const validator = require('validator');
const userRole = require('../utility/userRole');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String, 
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [validator.isEmail, "field must be a valid email address"]
    },
    password: {
        type: String,
        required: true,
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
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    country : {
        type: String
    },
    city : {
    type : String
    },
        nationality: {
            type: String,
            require: true,
           
        },
        PassportNumber: {
            type: String,
            require: true,
           
        },
        search : {
            from : {type: String},
            to : {type: String}
        }
    }
)
        /*----------------------------------------------------------*/
        // address: {
        //     type: String,
        //     require: true,
           
        // },
        // mobilePhone: {
        //     type: Number,
        //     require: true,
        //    /*----------------------------------------------------------*/
        // },

userSchema.methods.generateResetToken = function() {
    // Generate a random token
    const token = require('crypto').randomBytes(2).toString('hex');
    // Set the reset password token
    this.resetPasswordToken = token;
    // Set the expiration time to 1 hour from now
    this.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    return token;
};


const User = mongoose.model('User', userSchema);

module.exports = User;