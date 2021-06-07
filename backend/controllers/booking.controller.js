const db = require("../models");
const Vehicle = db.vehicle;
const User = db.user;
const Booking = db.booking;
const Insurance = db.insurance;

const Op = db.Sequelize.Op;
var nodemailer = require('nodemailer')

const puppeteer = require("puppeteer");

const uploadFile = require("../middleware/uploadDriverImage");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "victorypearl69@gmail.com",
    pass: "Pa$$word123"
  }
})

exports.findAll = (req, res) => {
  Booking.findAll({
    include: [{
      model: User,
      as: 'user'
    },
    {
      model: Vehicle,
      as: "vehicle"
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
    // where: {
    //   userID: req.body.userID,
    // },
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

// Update a Update by the id in the request
exports.update = async (req, res) => {
  const id = req.body.id;
  Booking.update(req.body, {
    where: { id: id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Booking " + id,
      });
    });
};


// Report Driver
exports.reportDriver = async (req, res) => {
  try {
    await uploadFile(req, res);

    let mailOptions = {
      from: "victorypearl69@gmail.com",
      to: "udayangajayamuthu@gmail.com",
      subject: "BangerCo Fraudulent User",
      text: "Drivers Licence: "+ req.body.drivingLicenceNumber + "\n Date and Time:" + req.body.time,
      attachments: [
        { filename: 'driverImage.jpg', path: "./driverImage.jpg" }
      ]
    }
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err)
      }
      else {
        console.log("Email sent successfully")
      }
    })

  } catch (error) {
    console.log(error)
  }
};


exports.fraudulentUser = async (req, res) => {
  const insuranceFraudUser = await Insurance.findOne({where: {nic: req.body.nic}});
  
  if (insuranceFraudUser === null) {
    res.send(false);
  } else {
    res.send(true);
  }
};

// Web Scraping
exports.competitorPrices = async (req, res) => {
  try {
    let url = "http://www.rentcarsrilanka.com/rent-a-car-srilanka-rates.php";

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    let list = [];
    let e1 = [];
    let txt1 = null;
    let carName = null;
    let e2 = [];
    let txt = null;
    let carPrice = null;
    let e3 = [];
    let txt2 = null;
    let image = null;

    [e1] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[16]/td[2]/strong"
    );
    txt1 = await e1.getProperty("textContent");
    carName = await txt1.jsonValue();
    [e2] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[16]/td[5]/div/strong"
    );
    txt = await e2.getProperty("textContent");
    carPrice = await txt.jsonValue();
    [e3] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[17]/td[2]/img"
    );
    txt2 = await e3.getProperty("src");
    image = await txt2.jsonValue();

    let car1 = {
      carName,
      carPrice,
      image,
    };
    list.push(car1);

    [e1] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[19]/td[2]/strong"
    );
    txt1 = await e1.getProperty("textContent");
    carName = await txt1.jsonValue();
    [e2] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[19]/td[5]/div/strong"
    );
    txt = await e2.getProperty("textContent");
    carPrice = await txt.jsonValue();
    [e3] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[20]/td[2]/img"
    );
    txt2 = await e3.getProperty("src");
    image = await txt2.jsonValue();

    let car2 = {
      carName,
      carPrice,
      image,
    };

    list.push(car2);

    [e1] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[31]/td[2]/strong"
    );
    txt1 = await e1.getProperty("textContent");
    carName = await txt1.jsonValue();
    [e2] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[31]/td[5]"
    );
    txt = await e2.getProperty("textContent");
    carPrice = await txt.jsonValue();
    [e3] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[32]/td[2]/img"
    );
    txt2 = await e3.getProperty("src");
    image = await txt2.jsonValue();

    let car3 = {
      carName,
      carPrice,
      image,
    };

    list.push(car3);

    [e1] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[34]/td[2]/strong"
    );
    txt1 = await e1.getProperty("textContent");
    carName = await txt1.jsonValue();
    [e2] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[34]/td[5]/strong"
    );
    txt = await e2.getProperty("textContent");
    carPrice = await txt.jsonValue();
    [e3] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[35]/td[2]/img"
    );
    txt2 = await e3.getProperty("src");
    image = await txt2.jsonValue();

    let car4 = {
      carName,
      carPrice,
      image,
    };

    list.push(car4);

    [e1] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[46]/td[2]/strong"
    );
    txt1 = await e1.getProperty("textContent");
    carName = await txt1.jsonValue();
    [e2] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[46]/td[5]/strong"
    );
    txt = await e2.getProperty("textContent");
    carPrice = await txt.jsonValue();
    [e3] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[47]/td[2]/img"
    );
    txt2 = await e3.getProperty("src");
    image = await txt2.jsonValue();

    let car5 = {
      carName,
      carPrice,
      image,
    };

    list.push(car5);

    [e1] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[49]/td[2]/strong"
    );
    txt1 = await e1.getProperty("textContent");
    carName = await txt1.jsonValue();
    [e2] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[49]/td[5]/strong"
    );
    txt = await e2.getProperty("textContent");
    carPrice = await txt.jsonValue();
    [e3] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[50]/td[2]/img"
    );
    txt2 = await e3.getProperty("src");
    image = await txt2.jsonValue();

    let car6 = {
      carName,
      carPrice,
      image,
    };

    list.push(car6);

    [e1] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[58]/td[2]/strong"
    );
    txt1 = await e1.getProperty("textContent");
    carName = await txt1.jsonValue();
    [e2] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[61]/td[5]/strong"
    );
    txt = await e2.getProperty("textContent");
    carPrice = await txt.jsonValue();
    [e3] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[59]/td[2]/img"
    );
    txt2 = await e3.getProperty("src");
    image = await txt2.jsonValue();

    let car7 = {
      carName,
      carPrice,
      image,
    };

    list.push(car7);

    [e1] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[64]/td[2]/strong"
    );
    txt1 = await e1.getProperty("textContent");
    carName = await txt1.jsonValue();
    [e2] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[64]/td[5]/strong"
    );
    txt = await e2.getProperty("textContent");
    carPrice = await txt.jsonValue();
    [e3] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[65]/td[2]/img"
    );
    txt2 = await e3.getProperty("src");
    image = await txt2.jsonValue();

    let car8 = {
      carName,
      carPrice,
      image,
    };

    list.push(car8);

    [e1] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[67]/td[2]/strong"
    );
    txt1 = await e1.getProperty("textContent");
    carName = await txt1.jsonValue();
    [e2] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[67]/td[5]/strong"
    );
    txt = await e2.getProperty("textContent");
    carPrice = await txt.jsonValue();
    [e3] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[68]/td[2]/img"
    );
    txt2 = await e3.getProperty("src");
    image = await txt2.jsonValue();

    let car9 = {
      carName,
      carPrice,
      image,
    };

    list.push(car9);

    [e1] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[70]/td[2]/strong"
    );
    txt1 = await e1.getProperty("textContent");
    carName = await txt1.jsonValue();
    [e2] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[70]/td[5]/strong"
    );
    txt = await e2.getProperty("textContent");
    carPrice = await txt.jsonValue();
    [e3] = await page.$x(
      "/html/body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[4]/table/tbody/tr[2]/td/table/tbody/tr[71]/td[2]/img"
    );
    txt2 = await e3.getProperty("src");
    image = await txt2.jsonValue();

    let car10 = {
      carName,
      carPrice,
      image,
    };

    list.push(car10);
    // console.log(list)

    res.status(200).json(list);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "error",
    });
  }
}