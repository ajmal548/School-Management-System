var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();

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


router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        //console.log('success');
        try {
            if (err || !user) {
                const error = new Error('An error occurred.');

                return next(error);
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);

                const body = { 
                    _id: user._id, 
                    email: user.email,
                    //name: user.name,
                    //ph: user.ph,
                    //age:user.age,
                    type:user.type
                 };
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
    res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.query.key
    })
});
module.exports = router;