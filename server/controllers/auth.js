//Packages Imports
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const { OAuth2Client } = require('google-auth-library');
const _ = require('lodash');

//File Imports
const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");

require('dotenv').config();


//GET ROUTERS
//removes cookie token for sign in from browser
exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({ message: "Sign out success" });
};

//POST ROUTERS
//creates new user ---- new row in user table in database
exports.signup = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};

//sign in user using authentication email-password and creates cookie token 
exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User with that email does not exist. Please signup!"
            });
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie("t", token, { expire: new Date() + 3600 });
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

exports.socialLogin = async (req, res) => {
    try {
        const idToken = await req.body.tokenId;
        const ticket = await client.verifyIdToken({ idToken, audience: process.env.REACT_APP_GOOGLE_CLIENT_ID });
        const { email_verified, email, name, sub: googleid } = ticket.getPayload();
 
        if (email_verified) {
            console.log(`email_verified > ${email_verified}`);
 
            const newUser = { email, name, password: googleid };
            let user = User.findOne({ email }, (err, user) => {
                if (err || !user) {
                    user = new User(newUser);
                    req.profile = user;
                    user.save();
                    const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET);
                    res.cookie('t', token, { expire: new Date() + 9999 });
                    const { _id, name, email } = user;
                    return res.json({ token, user: { _id, name, email } });
                } else {
                    req.profile = user;
                    user = _.extend(user, newUser);
                    user.updated = Date.now();
                    user.save();
                    const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET);
                    res.cookie('t', token, { expire: new Date() + 9999 });
                    const { _id, name, email } = user;
                    return res.json({ token, user: { _id, name, email } });
                }
            });
        }
    } catch (error) {
        return res.json({
            error: 'Request failed'
        });
    }
};

//MIDDLEWARE used for multiple routes / CRUD methods
//user needs to be auth 
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

//user needs to be signed in to access pages
exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Access denied"
        });
    }
    next();
};

//user needs to be signed in as admin to access admin pages
exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin page! Access denied"
        });
    }
    next();
};

