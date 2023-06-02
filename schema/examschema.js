var mongoose = require("mongoose");
var examschema = mongoose.Schema({
    examination: String
});
var exam = mongoose.model("exam", examschema, "examination");
module.exports = exam;