const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

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

  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {};

// Update a Update by the id in the request
exports.update = (req, res) => {
  const email = req.body.email;
  const id = req.body.id;

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

exports.moderatorPage = (req, res) => {
  res.status(200).send("Moderator Content.");
};
