const db = require("../models");
const Vehicle = db.vehicle;
const User = db.user;
const Booking = db.booking;

const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  Booking.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Booking Info.",
      });
    });
};

exports.findAllUser = (req, res) => {
  Booking.findAll({
    where: {
      userID: req.body.userID
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Booking Info.",
      });
    });
};

exports.create = (req, res) => {
  Booking.create({
    vehicleID: req.body.vehicleID,
    userID: req.body.userID,
    pickUpTime: req.body.pickUpTime,
    dropOffTime: req.body.dropOffTime,
    status: req.body.status,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating a Booking.",
      });
    });
    
};
