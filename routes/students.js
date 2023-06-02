var express = require('express');

var router = express.Router();

var studentmodel = require('../schema/studentschema');
var stdsub_collection = require('../schema/stdsubschema')


var mongoose = require('mongoose');

router.post('/', function (req, res) {
   var StudentInfo = req.body;
   console.log(StudentInfo);
   if (!StudentInfo.name || !StudentInfo.age || !StudentInfo.ph) {
      res.send("Sorry,worng data");
   } else {
      var newstudents = new studentmodel({
         name: StudentInfo.name,
         age: StudentInfo.age,
         ph: StudentInfo.ph
      })

      var c = StudentInfo.ph;
      console.log(c.length);
      if (c.length < 10 || c.length > 10) {
         res.send("please enter 10 digit");
      } else {
         res.send("done");
      }
      {
         newstudents.save(function (err) {
            if (err) {
               res.send("Database error");
            }
         });
         res.send("done");
      }
   }
});


router.get('/find', function (req, res) {
   console.log('finded')
   student.find(function (err, data) {
      res.send(data)
   });
});

router.get('/:_id', function (req, res) {
   student.findOne({ _id: req.params._id }, function (err, data) {
      if (err) {
         console.log(err);
      } else {
         res.send(data)
      }
   });
});
router.delete('/:_id', function (req, res) {
   student.remove({ _id: req.params._id }, function (err, data) {
      if (err) {
         console.log(err);
      } else {
         res.send(data);
         console.log("deleted")
      }
   });
});
router.put('/:_id', function (req, res) {
       student.findOneAndUpdate({ _id: req.params._id },
      { name: req.body.name }, function (err, data) {
         console.log("hello st");
         if (err) {
            res.send("err");
         } else {
            console.log("update");
            res.send(data);

         }
      });
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

   } catch (e) {
      console.log(e);
   }
});

//populate by id 

router.get('/id/:stID', function (req, res) {
   stdsub_collection.find({ stID: req.params.stID }).select({ 'stID': 0 }).
      populate('sbID').
      exec(function (err, data) {
         if (err) {
            res.send("err")
         } else {
            console.log("data");
            res.send(data);
         }

      });
})


 module.exports = router;
//app.listen(3001);






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

