const db = require("../models");
const config = require("../config/auth.config");
const Vehicle = db.vehicle;

const Op = db.Sequelize.Op;

const uploadFile = require("../middleware/upload");

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

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
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
        message: "Error retrieving Vehicle with id=" + id,
      });
    });
};

// Delete a Vehicle with the specified id in the request
// Delete a Vehicle with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;

  Vehicle.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Vehicle was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Vehicle with id=${id}. Maybe Vehicle was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Vehicle with id=" + id
      });
    });
};

// Update a Update by the id in the request
exports.update = (req, res) => {
  const id = req.body.id;

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
