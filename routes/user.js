var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../schema/userschema');
const { body, validationResult } = require('express-validator');

router.post('/signup', passport.authenticate('signup', { session: false }),
    function (req, res, next) {
        console.log("signup");
        res.json({
            message: 'Signup successful',
            user: req.user
        });
    });

// router.post('/signup',function(req,res){
//     console.log("hi");
//     res.json()
// })

// router.post('/login', function(req, res, next) {
//     passport.authenticate('login', function(err, user, info) {
//       if (err) { return next(err); }
//       if (!user) { 
//           res.status(401);
//           res.end(info.message);
//           console.log('log1')
//           return;
//       }
//       req.login(user, { session: false }, async (error) => {
//         if (error) return next(error);

//         const body = { 
//             _id: user._id, 
//             email: user.email,
//             type:user.type
//          };
//          console.log('log2')
//         const token = jwt.sign({ user: body }, 'TOP_SECRET',{expiresIn:'1m'});

//         return res.json({ token });
//     }
//     );
//     })(req, res, next);
//   });

// router.post('/login', [
//     // Add validation rules for email and password fields
//     body('email').isEmail().withMessage('Email is not valid'),
//     body('password').notEmpty().withMessage('Password is required'),
//     body('type').notEmpty().withMessage('only for teacher')
// ], async (req, res, next) => {
//     // Check for validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         res.status(400);
//         return res.json({ errors: errors.array() });
//     }

//     passport.authenticate('login', async (err, user, info) => {
//         try {
//             if (err) {
//                 return next(error);
//             }
//             if (!user) {
//                 res.status(401);
//                 res.end(info.message);
//                 console.log('error')
//                 return;
//             }

//             req.login(user, { session: false }, async (error) => {
//                 if (error) return next(error);

//                 const body = {
//                     _id: user._id,
//                     email: user.email,
//                     type: user.type
//                 };
//                 console.log('success')
//                 const token = jwt.sign({ user: body }, 'TOP_SECRET');

//                 return res.json({ token });
//             }
//             );
//         } catch (error) {
//             return next(error);
//         }
//     })(req, res, next);
// });

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err) {
                return next(error);
            }
            if (!user) {
                res.status(401);
                res.end(info.message);
                console.log('error')
                return;
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);

                const body = {
                    _id: user._id,
                    email: user.email,
                    type: user.type
                };
                console.log('success')
                const token = jwt.sign({ user: body }, 'TOP_SECRET');

                return res.json({ token });
            }
            );
        } catch (error) {
            return next(error);
        }
    }
    )(req, res, next);
});

router.get('/profile', (req, res, next) => {
    console.log(req)
    res.json({
        message: 'You made it to the secure route',
        user: req.body,
        token: req.query.key
    })
});
router.get('/find',async(req,res)=>{
    var data = await User.find({name:{$regex :req.query.name}})
    res.send(data)
});

module.exports = router;