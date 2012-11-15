var nodemailer = require('nodemailer');

exports.sendmail = function(fromEmail, toEmail, subject, bodyText, callbeck){

	// Create a SMTP transport object
	var transport = nodemailer.createTransport("SMTP", {
	        service: 'Gmail', // use well known service
	        auth: {
	            user: "frbntest1@gmail.com",
	            pass: "Pass!111"
	        }
	    });

	console.log('SMTP Configured for Gmail');

	var message = {
	    from: fromEmail,
	    to: toEmail,
	    subject: subject, //
	    headers: {
	        'X-Laziness-level': 1000
	    },
	    text: bodyText,
	};

	console.log('Sending Mail');
	transport.sendMail(message, function(error){
	    if(error){
	        console.log('Error occured');
	        console.log(error.message);
		    callbeck(false);
	        return;
	    }
	    console.log('Message sent successfully!');
	    callbeck(true);
	});
};