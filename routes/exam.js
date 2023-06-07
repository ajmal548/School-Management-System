var express = require("express");
var router = express.Router();

var exam = require("../schema/examschema");

router.post("/",function(req,res){

    var newexam = new exam({
        examination:req.body.examination
    });
    {
        newexam.save(function(err,data){
            if(err){
                res,send("err")
            } 
        })
        res.send("data");
    }

});
module.exports=router;