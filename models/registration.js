var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId

var Registration = new Schema({
    id : ObjectId
    , email : { type: String }
    , regId : { type: String }
});

exports.Registration = Registration; 