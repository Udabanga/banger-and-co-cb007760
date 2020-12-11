const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

global.__basedir = __dirname;

const app = express();

var corsOptions = {
  origin: ["http://localhost:3000", "http://192.168.8.100:3000"]
};




app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./backend/models");
const Role = db.role;
const User = db.user;



db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Banger & Co application." });
});

// routes
require('./backend/routes/auth.routes')(app);
require('./backend/routes/user.routes')(app);
require('./backend/routes/vehicle.routes')(app);
require('./backend/routes/upload.routes')(app);

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
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

