var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId; 




exports.listOfNotifications = function(req, res){
	Notification = mongoose.model('Notification');
	Notification.find(function(err1, nList){
		res.render('listOfNotifications', { 
			notifications: nList
		});
	});
};

exports.listOfActivations = function(req, res){
	Activation = mongoose.model('Activation');
	Activation.find(function(err, aList){
		res.render('listOfActivations', { 
			activations: aList
		});
	});
};


exports.listOfRegistrations = function(req, res){
	Registration = mongoose.model('Registration');
	Registration.find(function(err1, rList){
		res.render('listOfRegistrations', { 
			registrations: rList
		});
	});
};


exports.removeNotification = function(req, res){
	
	console.log('GET removeNotification.');
	console.log('With ObjectId = %s', req.query['ObjectId']);

	Notification = mongoose.model('Notification');
	Notification.remove(
		{ _id: new ObjectId(req.query['ObjectId']) }
		, function(err){
			res.json({
				status: 'OK'
				, error: err
			});
		}
	);
};


exports.removeRegistration = function(req, res){
	
	console.log('GET removeRegistration.');
	console.log('With ObjectId = %s', req.query['ObjectId']);

	Registration = mongoose.model('Registration');
	Registration.remove(
		{ _id: new ObjectId(req.query['ObjectId']) }
		, function(err){
			res.json({
				status: 'OK'
				, error: err
			});
		}
	);
};

exports.removeActivation = function(req, res){
	
	console.log('GET removeActivation.');
	console.log('With ObjectId = %s', req.query['ObjectId']);
	Activation = mongoose.model('Activation');

	Activation.remove(
		{ _id: new ObjectId(req.query['ObjectId']) }
		, function(err){
			res.json({
				status: 'OK'
				, error: err
			});
		}
	);
};