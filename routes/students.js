var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');


// var cron = require('node-cron');

var student = require('../schema/studentschema');
var stdsub_collection = require('../schema/stdsubschema');
var mark = require("../schema/markschema");

router.post('/',async(req,res)=>{
   console.log("post")
   try{
      var StudentInfo = req.body;
      if (!StudentInfo.name || !StudentInfo.age || !StudentInfo.ph) {
         res.send("Sorry,worng data");
      } else {
         var newstudents = new studentmodel({
            name: StudentInfo.name,
            age: StudentInfo.age,
            ph: StudentInfo.ph
         })
         var c = StudentInfo.ph;
         if (c.length < 10 || c.length > 10) {
            res.send("please enter 10 digit");
         } else {
            res.send("done")
         }
         var data = await newstudents.save()
            res.send(data);
      }
   }catch(err){
      res.send(err)
   }
});



// router.post('/',async(req,res)=>{
//    try{
//       var StudentInfo = req.body;
//       if (!StudentInfo.name || !StudentInfo.age || !StudentInfo.ph) {
//          res.send("Sorry,worng data");
//       } else {
//          var newstudents = new studentmodel({
//             name: StudentInfo.name,
//             age: StudentInfo.age,
//             ph: StudentInfo.ph
//          })
//          var c = StudentInfo.ph;
//          if (c.length < 10 || c.length > 10) {
//             res.send("please enter 10 digit");
//          } else {
//             res.send("done")
//          }
//          var data = await newstudents.save()
//             res.send(data);
//       }
//    }catch(err){
//       res.send(err)
//    }
// });



// cron.schedule('*/20 * * * * *',async () => {
//    var data = await student.find()
//    console.log(data);
//  });






router.get('/find',async(req,res)=>{
   console.log(req.query);
   var data = await student.find(req.query) 
      res.send(data)
});

router.get('/',async(req,res)=>{
   var data = await student.find() 
      res.send(data)
});

router.get('/:_id',async(req,res)=>{
   var data = await student.findOne({ _id: req.params._id })
      res.send(data)
});

router.delete('/:_id',async(req,res)=>{
   var data = await student.remove({ _id: req.params._id })
      res.send(data);
      console.log("deleted");
});
router.put('/:_id',async(req,res)=>{
   var data = await student.findOneAndUpdate({ _id: req.params._id },{ name: req.body.name })  
      console.log("update");
      res.send(data);
});

// Adding Pagination
router.get('/students/page', async (req, res) => {
   console.log("hi");
   try {
      var limitValue = req.query.limit;
      var page = req.query.page;
      var name = req.query.name;
      if (name) {
         var data = await student.find(
            { name: { $regex: name } }
         ).limit(limitValue);
         res.send(data);
      } else {
         var data = await student.find()
            .limit(limitValue).skip((page - 1) * limitValue);
         res.status(200).send(data);
      }

   } catch (err) {
      console.log(err);
   }
});

//populate by id 
router.get('/id/:stID',async(req, res)=>{
   var data = await stdsub_collection.find({ stID: req.params.stID })
      .select({ 'stID': 0 })
      .populate('sbID')
      console.log("data");
      res.send(data);
});
//exam marks
router.get('/:exam/:stID', async (req, res) => {
   var data = await mark.find({ exam: req.params.exam, stID: req.params.stID })
       .select({ 'stID': 0 })
       .populate('sbID')
   res.send(data);
});
 module.exports = router;
 
//limit and skip
// app.get('/students/page', async (req, res) => {
   //    try {
   
   //       var limitValue = req.query.limit;
   //       var page = req.query.page;
   
   //       var posts = await student.find()
   //          .limit(limitValue).skip((page - 1) * limitValue);
   //       res.status(200).send(posts);
   //    } catch (e) {
   //       console.log(e);
   //    }
   // });
   
   // app.get('/search/:name', async (req, res) => {
   //    console.log("hi")
   //    console.log(req.params.name)
   
   //    var data = await student.find(
   //       { name: { $regex: req.params.name } }
   //    )
   //    res.send(data);
   // });

