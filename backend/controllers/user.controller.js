const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const uploadFile = require("../middleware/uploadDrivingLicence");


// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.findAll({
    include: {
      model: Role,
      as: "roles",
      where: {
        id: {
          [Op.eq]: 1,
        },
      },
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving User.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.body.id;

  User.findByPk(id,{
    include: {
      model: Role,
      as: "roles",
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Update a Update by the id in the request
exports.update = (req, res) => {
  const email = req.body.email;
  const id = req.body.id;
  const NICNumber = req.body.NICNumber;
  const drivingLicenceNumber = req.body.drivingLicenceNumber;

  // const id = req.params.id

  User.update(req.body, {
    where: { id: id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User " + email,
      });
    });
};

// Content Responses
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userPage = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminPage = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.employeePage = (req, res) => {
  res.status(200).send("Employee Content.");
};
