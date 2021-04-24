const db = require("../models");
const Vehicle = db.vehicle;
const User = db.user;
const Booking = db.booking;

const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  Booking.findAll({
    include: [{
      model: User,
    },
    {
      model: Vehicle
    }
  ],
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

exports.findAllUser = (req, res) => {
  Booking.findAll({
    where: {
      userID: req.body.userID,
    },
    include: [{
      model: User,
    },
    {
      model: Vehicle
    }
  ],
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


exports.findOne = (req, res) => {
  const id = req.body.id;

  Booking.findByPk(id, {
    include: [{
      model: User,
      as: "user",
      // where: {
      //   id: {
      //     [Op.eq]: 1,
      //   },
      // },
    },
    {
      model: Vehicle,
      as: "vehicle",
    }]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err
      });
    });
};

exports.create = (req, res) => {
  Booking.create({
    vehicleID: req.body.vehicleID,
    userID: req.body.userID,
    pickUpTime: req.body.pickUpTime,
    dropOffTime: req.body.dropOffTime,
    satNav: req.body.satNav,
    babySeats: req.body.babySeats,
    wineChiller: req.body.wineChiller,
    bookCost: req.body.bookCost,
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
