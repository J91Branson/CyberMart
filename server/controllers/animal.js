//File Imports
const Animal = require("../models/animal");
const { errorHandler } = require("../helpers/dbErrorHandler");

//PARAM ROUTER 
//To finds a specific animal 
exports.animalById = (req, res, next, id) => {
    Animal.findById(id).exec((err, animal) => {
        if (err || !animal) {
            return res.status(400).json({
                error: "animal does not exist"
            });
        }
        req.animal = animal;
        next();
    });
};

// GET ROUTERS
//Takes returned animal response above and display it
exports.read = (req, res) => {
    return res.json(req.animal);
};

//Displays all categories
exports.list = (req, res) => {
    Animal.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

// POST ROUTERS
// To add new animal to database 
exports.create = (req, res) => {
    const animal = new Animal(req.body);
    animal.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};

// PUT ROUTERS
//To updates a specific animal 
exports.update = (req, res) => {
    const animal = req.animal;
    animal.name = req.body.name;
    animal.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

// DELETE ROUTERS
//To deletes a specific animal 
exports.remove = (req, res) => {
    const animal = req.animal;
    animal.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Animal deleted"
        });
    });
};
