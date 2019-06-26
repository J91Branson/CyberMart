// var passport = require("passport");
// var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
// require('dotenv').config();

// module.exports = function (user) {
//     var User = user;

//     passport.serializeUser((user, done) => {
//         done(null, user);
//     });
//     passport.deserializeUser((user, done) => {
//         done(null, user);
//     });


//     // Sign Up --- using google authentication
//     passport.use(
//         new GoogleStrategy(
//             {
//                 clientID: process.env.GOOGLE_CLIENT_ID,
//                 clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//                 callbackURL: "http://localhost:8000/auth/google/callback"
//             },
//             (accessToken, refreshToken, profile, done) => {
//                 var userData = {
//                     email: profile.emails[0].value,
//                     name: profile.displayName,
//                     token: accessToken
//                 };
//                 done(null, userData);
//             }
//         )
//     );
// };