const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.vehicle = require("./vehicle.model.js")(sequelize, Sequelize);
db.booking = require("./booking.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "employee"];

// db.user.hasMany(db.booking) 


// db.vehicle.belongsToMany(db.user, {
//   through: "bookings",
//   foreignKey: "vehicleID",
//   otherKey: "userID"
// });
// db.user.belongsToMany(db.vehicle, {
//   through: "bookings",
//   foreignKey: "userID",
//   otherKey: "vehicleID"
// });

// db.user.hasMany(db.booking,{
//   foreignKey: "userID",
// })

// db.vehicle.hasMany(db.booking,{
//   foreignKey: "vehicleID",
// })

db.booking.hasOne(db.user,{
  foreignKey: "id",
  sourceKey:"userID"
})

db.booking.hasOne(db.vehicle,{
  foreignKey: "id",
  sourceKey:"vehicleID"
})


db.vehicle.hasMany(db.booking,{
  foreignKey: "id",
  // sourceKey:"bookingIDs",
  constraints: false
})

// db.vehicle.belongsToMany(db.booking, {
//   foreignKey: "vehicleID",
// });
// db.user.belongsToMany(db.booking, {
//   foreignKey: "userID",
// });

// db.booking.hasOne(db.user,{
//   foreignKey: 'userID',
// })
// db.booking.hasOne(db.vehicle, {
//   foreignKey: 'vehicleID',
// })

module.exports = db;
