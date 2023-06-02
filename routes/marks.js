var express = require("express");
var router = express.Router();

var mark = require("../schema/markschema");

var mongoose = require('mongoose');

router.post("/", function (req, res) {
    if (!req.body.exam || !req.body.stID || !req.body.sbID || !req.body.mark) {
        res.send("pls fill all data")
    } else {
        var newmark = new mark({
            exam: req.body.exam,
            stID: req.body.stID,
            sbID: req.body.sbID,
            mark: req.body.mark
        });
    }
    {
        newmark.save(function (err) {
            if (err) {
                res.send("Database error");
            }
        });
        res.send("done");
    }

});

// router.get('/:exam', function (req, res) {
//     mark.find({ exam: req.params.exam },function (err, data) {
//             if (err) {
//                 res.send("err")
//             } else {
//                 console.log("data");
//                 res.send(data);
//             }

//         });
// });


router.get('/:exam', function (req, res) {
    mark.find({ exam: req.params.exam }).select({ 'exam': 0 }).
        populate('sbID')
        .exec(function (err, data) {
            if (err) {
                res.send("err")
            } else {
                console.log("data");
                res.send(data);
            }

        });
});

router.get('/:exam/:stID', function (req, res) {
    mark.find({ exam: req.params.exam, stID: req.params.stID }).select({ 'exam': 0 }).
        populate('sbID').
        exec(function (err, data) {
            if (err) {
                res.send("err")
            } else {
                console.log("data");
                res.send(data);
            }

        });
});

module.exports = router;

