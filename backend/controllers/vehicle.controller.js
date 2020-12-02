const db = require("../models");
const config = require("../config/auth.config");
const Vehicle = db.vehicle;

const Op = db.Sequelize.Op;

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  Vehicle.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving User.",
      });
    });
};

exports.create = (req, res) => {
  Vehicle.create({
    type: req.body.type,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    colour: req.body.colour,
    fuelType: req.body.fuelType,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating a Vehicle.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.body.id;

  Vehicle.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Vehicle with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {};

// Update a Update by the id in the request
exports.update = (req, res) => {
  const id = req.body.id;
  const type = req.body.type;
  const manufacturer= req.body.manufacturer;
  const model= req.body.model;
  const colour=req.body.colour;
  const fuelType= req.body.fuelType;

  // const id = req.params.id

  Vehicle.update(req.body, {
    where: { id: id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Vehicle " + id,
      });
    });
};
