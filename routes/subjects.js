var express = require('express');
var router = express.Router();



var mongoose = require('mongoose');
var subject = require('../schema/subjectschema');
//mongoose.connect('mongodb://localhost/my_school');


router.post('/', function (req, res) {
    var SubInfo = req.body;
    console.log("posting");
    if (!SubInfo.name) {
        res.send('err info');
    } else {
        var newsubjects = new subject({
            name: SubInfo.name,
        })
        {
            newsubjects.save(function (err) {
                if (err) {
                    res.send("Database error");
                }
            });
            res.send("done");
        }
    }

});

router.get('/find', function (req, res) {
    subject.find(function (err, data) {
        res.send(data)
    });
});

router.get('/:_id', function (req, res) {
    console.log('finded')
    subject.findOne({ _id: req.params._id }, function (err, data) {
        if (err) {
            console.log('err')
        } else {
            res.send(data)
        }
    });
});

router.delete('/:_id', function (req, res) {
    console.log('dlt')
    subject.remove({ _id: req.params._id }, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    });
});

router.put('/:_id', function (req, res) {
    console.log("updated");
    subject.findOneAndUpdate({ _id: req.params._id },
        { name: req.body.name }, function (err, data) {
            if (err) {
                res.send("err");
            } else {
                res.send("updated");

            }
        });
});

module.exports = router;
//app.listen(1000);