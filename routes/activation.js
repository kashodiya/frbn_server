var mongoose = require('mongoose');
var sendmail = require('../utils/sendmail').sendmail;

exports.verifyToken = function(req, res){
	var email = req.param('email');
	var token = req.param('token');

	console.log('POST request for verify activation .');
	console.log('With email = %s', req.param('email'));
	console.log('With token = %s', req.param('token'));


	Activation = mongoose.model('Activation');
	Activation.findOne({
		email: email
		, token: token
	}, function(err, obj){
		if(obj){
			res.json({
				status: 'OK'
			});
		}else{
			res.json({
				status: 'FAILED',
				errorText: 'Verification failed. Token does not match.'
			});
		}
	});
}

exports.index = function(req, res){
	
	//console.log(sendmail);
	console.log('GET request for activation received.');
	console.log('With emailid = %s', req.param('email'));

	Activation = mongoose.model('Activation');
	var token = String(Math.floor(Math.random()*100000+1));

	/*
	var act = new Activation({
		email: req.param('email')
		, token: token
	});
	*/

	//check if this email exists


	Activation.update({
		email: req.param('email')
		, token: token
	}
	, {$set: { email: req.param('email') }}
	, {upsert: true}, function(err){
		if (err){
			res.json({
				status: 'FAILED',
				errorText: 'Failed to insert into database'
			});
		}else{
			sendmail(
				'frbntest1@gmail.com'
				, req.param('email')
				, 'FRB Notification activation request'
				, 'Please enter this token in your app: ' + token
				, function(success){
				if(success){
					res.json({
						status: 'OK'
						, message: 'Email sent with token'
					});
				}else{
					res.json({
						status: 'FAILED',
						errorText: 'Failed to insert into database'
					});
				}
			});
		}
	});


/*
	act.save(function (err) {
		if (err){
			res.json({
				status: 'FAILED',
				errorText: 'Failed to insert into database'
			});
		}else{
			sendmail(
				'frbntest1@gmail.com'
				, req.param('email')
				, 'FRB Notification activation request'
				, 'Please enter this token in your app: ' + token
				, function(success){
				if(success){
					res.json({
						status: 'OK'
						, message: 'Email sent with token'
					});
				}else{
					res.json({
						status: 'FAILED',
						errorText: 'Failed to insert into database'
					});
				}
			});
		}
	});
*/	
};