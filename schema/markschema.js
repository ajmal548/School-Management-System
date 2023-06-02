var { ObjectId } = require('mongodb');
var mongoose = require('mongoose');

var markschema = mongoose.Schema({
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'exam' },
    stID: { type: mongoose.Schema.Types.ObjectId, ref: 'student' },
    sbID: { type: mongoose.Schema.Types.ObjectId, ref: 'subject' },
    mark: Number
});
var mark = mongoose.model("mark", markschema, "marks")
module.exports = mark;