var express = require('express');
var router = express.Router();
var subject = require('../schema/subjectschema');

router.post('/', async (req, res) => {
    try {
        var SubInfo = req.body;
        if (!SubInfo.name) {
            res.send('err info');
        } else {
            var newsubjects = new subject({
                name: SubInfo.name,
            })
            var data = await newsubjects.save()
            res.send(data);
        }
    } catch (err) {
        res.send(err)
    }
});

router.get('/find', async (req, res) => {
    var data = await subject.find()
    res.send(data)
});

router.get('/:_id', async (req, res) => {
    var data = await subject.findOne({ _id: req.params._id })
    res.send(data)
});

router.delete('/:_id', async (req, res) => {
    var data = await subject.remove({ _id: req.params._id })
    res.send(data)
});

router.put('/:_id', async (req, res) => {
    var data = await subject.findOneAndUpdate({ _id: req.params._id }, { name: req.body.name })
    res.send("updated");
});
module.exports = router;