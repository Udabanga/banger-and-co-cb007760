const db = require("../models");
const config = require("../config/auth.config");
const Vehicle = db.vehicle;
const Booking = db.booking;

const Op = db.Sequelize.Op;

const uploadFile = require("../middleware/upload");
const bookingRoutes = require("../routes/booking.routes");

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
//   config.DB,
//   config.USER,
//   config.PASSWORD,
//   {
//     host: config.HOST,
//     dialect: config.dialect,
//     operatorsAliases: false,

//     pool: {
//       max: config.pool.max,
//       min: config.pool.min,
//       acquire: config.pool.acquire,
//       idle: config.pool.idle
//     }
//   }
// );

// Retrieve all Vehicles from the database.
exports.findAll = (req, res) => {
  Vehicle.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Vehicle.",
      });
    });
};

exports.create = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.filename,
    });

    Vehicle.create({
      type: req.body.type,
      manufacturer: req.body.manufacturer,
      model: req.body.model,
      transmission: req.body.transmission,
      fuelType: req.body.fuelType,
      dailyCost: req.body.dailyCost,
      seatNumber: req.body.seatNumber,
      imageName: req.file.filename.replace(/\s/g, ""),
      status: "Available",
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating a Vehicle.",
        });
      });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.filename}. ${err}`,
    });
  }
};

// Find a single Vehicle with an id
exports.findOne = (req, res) => {
  const id = req.body.id;

  Vehicle.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

// Find a single Vehicle Bookings with an id
exports.findOneBookings = (req, res) => {
  const id = req.body.id;

  Vehicle.findByPk(id,{
    include: {
      model: Booking,
      as: "bookings",
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

// Find Vehicles with type
exports.findAvailable = (req, res) => {
  const type = req.body.vehicleType;
  const pickUpTime = req.body.pickUpDate;
  const dropOffTime = req.body.dropOffDate;

  if (type === "Any") {
    Vehicle.findAll({
      // where: {
      //   // '$bookings.id$': null,
      //   [Op.or]: [
      //     // {
      //     //   [Op.and]: [
      //     //     { "$bookings.pickUpTime$": { [Op.lt]: pickUpTime } },
      //     //     { "$bookings.dropOffTime$": { [Op.lt]: dropOffTime } },
      //     //   ],
      //     // },
      //     // {
      //     //   [Op.and]: [
      //     //     { "$bookings.pickUpTime$": { [Op.gt]: pickUpTime } },
      //     //     { "$bookings.dropOffTime$": { [Op.gt]: dropOffTime } },
      //     //   ],
      //     // },
      //     {
      //       [Op.and]: [
      //         { "$bookings.dropOffTime$": { [Op.lt]: pickUpTime } },
      //         { "$bookings.pickUpTime$": { [Op.gt]: dropOffTime } },
      //       ],
      //     },
      //     {
      //       [Op.and]: [
      //         { "$bookings.pickUpTime$": null },
      //         { "$bookings.dropOffTime$": null },
      //       ],
      //     },
      //   ],
      // },
      include: [
        {
          model: Booking,
          as: "bookings",
        },
      ],
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Vehicle.",
        });
      });
  } else {
    Vehicle.findAll({
      where: {
        type: type,
        // '$bookings.id$': null
      },
      include: [
        {
          model: Booking,
          where: {
            //Not booked time not in range
          },
        },
      ],
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Vehicle.",
        });
      });
  }
};

// Delete a Vehicle with the specified id in the request
// Delete a Vehicle with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;

  Vehicle.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Vehicle was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Vehicle with id=${id}. Maybe Vehicle was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Vehicle with id=" + id,
      });
    });
};

// Update a Update by the id in the request
exports.update = async (req, res) => {
  const id = req.body.id;
  // const id = req.params.id
  // if()
  await uploadFile(req, res)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });

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
