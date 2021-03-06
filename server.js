const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
var multer = require('multer');
var upload = multer();
var nodemailer = require('nodemailer')

const app = express();

app.use(require('express-status-monitor')())
// require('dotenv').config();

global.__basedir = __dirname;

var corsOptions = {
  origin: ["http://localhost:3000", "http://192.168.8.100:3000"]
};



app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());


// app.use(bodyParser.urlencoded());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.static('public'))

// database
const db = require("./backend/models");
const Role = db.role;
const User = db.user;
const Booking = db.booking;



// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  // initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Banger & Co application." });
});

// routes
require('./backend/routes/auth.routes')(app);
require('./backend/routes/user.routes')(app);
require('./backend/routes/vehicle.routes')(app);
require('./backend/routes/upload.routes')(app);
require('./backend/routes/booking.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "employee"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

