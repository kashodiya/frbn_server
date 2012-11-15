var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId

var Activation = new Schema({
    id : ObjectId
    , email : { type: String }
    , token : { type : String }
});

exports.Activation = Activation; 