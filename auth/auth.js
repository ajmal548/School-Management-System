//middleware

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

var usermodel = require("../schema/userschema");

passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    async (req, email, password, done) => {
        const { name, ph, age, type } = req.body;
        try {
            const user = await usermodel.create({ email, password, name, ph, age, type });

            return done(null, user);
        } catch (error) {
            done(error);
        }
    }
)
);

passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    async (req,email, password, done) => {
        var type = "teacher"
        console.log("login")
        try {
            const user = await usermodel.findOne({ email ,type});

            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            const validate = await user.isValidPassword(password);

            if (!validate) {
                return done(null, false, { message: 'Wrong Password' });
            }

            return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
            return done(error);
        }
    }
)
);
//verify jwt
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'TOP_SECRET',
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('key')
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);
