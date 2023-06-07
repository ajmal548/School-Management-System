var express = require('express');
var router = express.Router();
var stdsub_collection =require("../schema/stdsubschema");

router.post('/', function (req, res) {
   var ssInfo = req.body;
   console.log("SSInfo");
   stdsub_collection.find({ stID: ssInfo.stID, sbID: ssInfo.sbID }, function (err, data) {
      if (data.length > 0) {
         console.log('exist');
         res.send('already exist');
      } else {
         var newmod = new stdsub_collection({
            stID: ssInfo.stID,
            sbID: ssInfo.sbID
         });
         {
            newmod.save(function (err) {
               if (err) {
                  res.send("Database error");
               }
            });
            res.send("done");
         }
      }
   });
});

router.get("/:stID", function (req, res) {
   console.log('finded');
   stdsub_collection.find({ stID: req.params.stID }, function (err, data) {
      if (err) {
         console.log('err');
         res.send(err);
      } else {
         console.log('data');
         res.send(data);
      }
   });
});



module.exports = router;
//populate all

// router.get("/", function (req, res) {
//    console.log('finded');
//    stdsub_collection.aggregate([
//       {
//          $lookup:
//          {
//             from: 'subjects',
//             localField: 'name',
//             foreignField: 'ObjectId(_id)',
//             as: 'sbID'
//          }
//       }

//    ], { stID: req.params.stID }, function (err, data) {
//       if (err) {
//          console.log('err');
//          res.send("not existing data");
//       } else {
//          console.log('data');
//          res.send(data);
//       }
//    });
// });
