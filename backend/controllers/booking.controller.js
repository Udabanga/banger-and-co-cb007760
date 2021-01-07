const db = require("../models");
const Vehicle = db.vehicle;
const User = db.user;
const Booking = db.Booking;

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

exports.createBooking = (req, res) => {
  Booking.create({
    // TODO
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
