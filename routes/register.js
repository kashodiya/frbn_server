var mongoose = require('mongoose');

exports.index = function(req, res){
	
	var regId = req.param('regId', 'NONE');
	var email = req.param('email', 'NONE');
	console.log('POST request register received.');
	console.log('With regId = %s, email = %s', regId, email);

	Registration = mongoose.model('Registration');

	var reg = new Registration({
		regId: regId
		, email: email
	});

	reg.save(function (err) {
		if (err){
			res.json({
				status: 'FAILED'
			});
		}else{
			res.json({
				status: 'OK'
			});
		}
	});
};