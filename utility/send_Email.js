var nodemailer = require("nodemailer");
require('dotenv').config();
const user = require('../models/user_model');
var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user:  process.env.email_verfication,// Use the provided email as the user
            pass: process.env.email_password
        }
    });


exports.sendEmail = async (email , rand) => {
    var mailOptions = {
        to: email,
        subject: "Please confirm your Email account",
        html: `
            <div style="font-family: Arial, sans-serif;">
                <p>Hello,</p>
                <p>Please confirm your Email account by using the following code:</p>
                <p style="font-size: 30px; color: #FF5733;">${rand}</p>
            </div>
        `
    }; 
    try {
        // Create SMTP transport with the provided email 
        await smtpTransport.sendMail(mailOptions);
        console.log("Email sent successfully.");
        return true;
    } catch (error) {
        console.log(email)
        console.error("Error sending email:", error);
        return false;
    }
}
///------------------SMTP Over-----------------------------/
