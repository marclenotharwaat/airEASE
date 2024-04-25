var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
/*
    Here we are configuring our SMTP Server details.
    SMTP is a mail server responsible for sending and receiving email.
*/
var smtpTransport = (email) => {
    return nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: email ,// Use the provided email as the user
            pass: "qtad ekim ujbe bwjv"
        }
    });
};

exports.sendEmail = async (email) => {
    var rand = Math.floor((Math.random() * 100) + 54);
    var mailOptions = {
        to: email,
        subject: "Please confirm your Email account",
        html: `
            <div style="font-family: Arial, sans-serif;">
                <p>Hello,</p>
                <p>Please confirm your Email account by using the following code:</p>
                <p style="font-size: 18px; color: #FF5733;">${rand}</p>
                <p>If you didn't request this, please ignore this email.</p>
            </div>
        `
    }; 
    

    try {
        // Create SMTP transport with the provided email
        var transporter = smtpTransport(email);
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully.");
    } catch (error) {
        console.log(email)
        console.error("Error sending email:", error);
    }
}
///------------------SMTP Over-----------------------------/

///------------------Routing Started ------------------------/

// app.get('/',function(req,res){
// 	res.sendfile('index.html');
// });
// app.get('/send',function(req,res){
//         rand=Math.floor((Math.random() * 100) + 54);
// 	host=req.get('host');
// 	link="http://"+req.get('host')+"/verify?id="+rand;
// 	mailOptions={
// 		to : req.query.to,
// 		subject : "Please confirm your Email account",
// 		html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"	
// 	}
// 	console.log(mailOptions);
// 	smtpTransport.sendMail(mailOptions, function(error, response){
//    	 if(error){
//         	console.log(error);
// 		res.end("error");
// 	 }else{
//         	console.log("Message sent: " + response.message);
// 		res.end("sent");
//     	 }
// });
// });

// app.get('/verify',function(req,res){
// console.log(req.protocol+":/"+req.get('host'));
// if((req.protocol+"://"+req.get('host'))==("http://"+host))
// {
// 	console.log("Domain is matched. Information is from Authentic email");
// 	if(req.query.id==rand)
// 	{
// 		console.log("email is verified");
// 		res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
// 	}
// 	else
// 	{
// 		console.log("email is not verified");
// 		res.end("<h1>Bad Request</h1>");
// 	}
// }
// else
// {
// 	res.end("<h1>Request is from unknown source");
// }
// });
