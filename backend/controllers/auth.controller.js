const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const uploadFile = require("../middleware/uploadDrivingLicence");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

var drivingLicenceImage;

exports.register = async (req, res) => {
  try {
    await uploadFile(req, res);
    drivingLicenceImage = req.file.filename;
  } catch {
    drivingLicenceImage = null;
  }

  // if (req.file === undefined) {
  //   return res.status(400).send({ message: "Please upload a file!" });
  // }

  // res.status(200).send({
  //   message: "Uploaded the file successfully: " + req.file.filename,
  // });
  // if (req.file.filename == null) {
  //   drivingLicenceImage = "null";
  // } else {
  //   drivingLicenceImage = req.file.filename;
  // }

  // Save User to Database
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    fName: req.body.fName,
    lName: req.body.lName,
    drivingLicence: drivingLicenceImage,
    status: "Pending",
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.login = (req, res) => {
  User.findOne({
    where: {
      // username: req.body.username
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 3600, // 1 hour
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
