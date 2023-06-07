var express = require("express");
var router = express.Router();
var mark = require("../schema/markschema");

router.post("/", async (req, res) => {
    try {
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
        var data = await newmark.save()
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});
router.get('/:exam', async (req, res) => {
    var data = await mark.find({ exam: req.params.exam })
    res.send(data);
});

router.get('/:exam/:stID', async (req, res) => {
    var data = await mark.find({ exam: req.params.exam, stID: req.params.stID })
        .select({ 'exam': 0 })
        .populate('sbID')
    res.send(data);
});

module.exports = router;