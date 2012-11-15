var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId

var Notification = new Schema({
    id : ObjectId
    , messageBody : { type: String }
    , category : { type: String }
    , district : { type: String }
    , title : { type: String }
    , timestamp : { type: Date, default: Date.now }
});

exports.Notification = Notification; 