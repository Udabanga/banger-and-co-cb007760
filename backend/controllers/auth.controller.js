const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;
const multer = require("multer");
const uploadFile = require("../middleware/uploadDrivingLicence");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

var drivingLicenceImage = null;
var identityFormImage = null;

exports.register = async (req, res) => {
  // Save images
  try {
    await multer({
      storage: multer.diskStorage({
        destination: "./public/uploads",
        filename: (req, file, cb) => {
          cb(null, `${file.fieldname}-${Date.now()}-${file.originalname.replace(/\s/g, "")}`);
        },
      }),
    }).fields([
      { name: "drivingLicence", maxCount: 1 },
      { name: "identityForm", maxCount: 1 },
    ]);

    await multer({
      storage: multer.diskStorage({
        destination: "./public/uploads",
        filename: (req, file, cb) => {
          cb(null, `${file.fieldname}-${Date.now()}-${file.originalname.replace(/\s/g, "")}`);
        },
      }),
    }).fields([
      { name: "drivingLicence", maxCount: 1 },
      { name: "identityForm", maxCount: 1 },
    ]);


    if (req.files.drivingLicence[0].filename != null) {
      drivingLicenceImage = req.files.drivingLicence[0].filename
    }
    if (req.files.identityForm[0].filename != null) {
      identityFormImage = req.files.identityForm[0].filename
    }
  } catch (error) {
    console.log(error)
  }

  // Save User to Database
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    fName: req.body.fName,
    lName: req.body.lName,
    NICNumber: req.body.NICNumber,
    drivingLicenceNumber: req.body.drivingLicenceNumber,
    drivingLicence: drivingLicenceImage,
    identityForm: identityFormImage,
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
