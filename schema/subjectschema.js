var mongoose = require('mongoose');
var subjectSchema = mongoose.Schema({
    name: String,
});
var subject = mongoose.model("subject", subjectSchema, "subjects");

module.exports = subject;

