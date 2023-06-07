var express = require("express");
var router = express.Router();
var exam = require("../schema/examschema");

router.post("/", async (req, res) => {
    var newexam = new exam({
        examination: req.body.examination
    });
    var data = await newexam.save();
    res.send(data);
});
module.exports = router;