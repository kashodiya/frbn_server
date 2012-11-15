var mongoose = require('mongoose');

exports.index = function(req, res){
	console.log('POST request unregister received.');
	console.log('With regId = %s', req.param('regId', 'NONE'));

	Registration = mongoose.model('Registration');
	Registration.remove(
		{'regId': req.param('regId', 'NONE')}
		, function(err){
		res.json({
			status: 'OK'
		});
	});
};