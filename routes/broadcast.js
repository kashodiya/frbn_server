var mongoose = require('mongoose');
var gcm = require('node-gcm');

exports.index = function(req, res){

	var messageBody = req.param('message', 'NONE');
	var title = req.param('title', 'NONE');
	var category = req.param('category', 'NONE');
	var district = req.param('district', 'NONE');
	var timestamp = Date.now();

	console.log('POST request broadcast received.');
	console.log('With message = %s', req.param('message', 'NONE'));

	var message = new gcm.Message();
	var sender = new gcm.Sender('AIzaSyBIq0ZsEuSpqB9ckkiVSZOiEJDSx8ucjWk');
	var registrationIds = [];

	Registration = mongoose.model('Registration');

	Notification = mongoose.model('Notification');

	var noti = new Notification({
	    messageBody : messageBody
	    , category : category
	    , district : district
	    , title : title
	    , timestamp : timestamp
	});

	noti.save(function (err) {
		if (err){
			res.json({
				status: 'FAILED'
			});
		}else{
			Registration.find(function(error, list){
				console.log(list);
				list.forEach(function(row, i){
					console.log(row.regId)
					registrationIds.push(row.regId);
				});

				message.addData('message', messageBody);
				message.addData('title', title);
				message.addData('category', category);
				message.addData('district', district);
				message.addData('timestamp', timestamp);

				message.collapseKey = 'frbn';
				message.delayWhileIdle = true;
				message.timeToLive = 3;
				sender.send(message, registrationIds, 4, function (result) {
				    console.log();
					res.json({
						status: 'OK'
						, result: result
					});
				});
			});
		}
	});
};