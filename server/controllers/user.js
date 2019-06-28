//File Imports
const User = require("../models/user");

//To finds a specific user 
exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    });
};

//Takes returned user response above (excl. password related data fields) and display it
exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

//Update user profile
exports.update = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        }
    );
};

