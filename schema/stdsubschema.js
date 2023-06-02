const { ObjectId } = require('mongodb');
var mongoose = require('mongoose');
var stdsubSchema = mongoose.Schema({
    stID: { type: mongoose.Schema.Types.ObjectId, ref: 'student' },
    sbID: { type: mongoose.Schema.Types.ObjectId, ref: 'subject' }

});
 
var stdsub_collection = mongoose.model("model", stdsubSchema, "stdsub_collection");

module.exports = stdsub_collection; 