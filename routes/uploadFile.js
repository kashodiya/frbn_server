var fs = require('fs')
  , path = require('path')

exports.index = function(req, res, next){
	if (req.files) {
		console.log(req.files.apkFile.path);
		console.log(req.files.apkFile.filename);
		console.log(path.join(__dirname, '..', 'download', req.files.apkFile.filename));
		fs.rename(req.files.apkFile.path
			, path.join(__dirname, '..', 'download', req.files.apkFile.filename)
			, function(err) {
				console.log(err);
		});
		res.json({
			status: 'OK'
		});
	}else{
		console.log('No files!');
		res.json({
			status: 'FAILED'
			, error: 'File not received by the server.'
		});
	}
	//res.redirect("/");
};
