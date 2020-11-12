const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

const app = express();
const port = 5000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "banger_co",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(
  expressSession({
    secret: "secretCode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretCode"));

app.post("/login", (req, res) => {
  console.log(req.body);
});

app.post("/register", async (req, res) => {
  try {
    const email = req.body.email;
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const sql = "INSERT INTO user(email, password) VALUES (?,?)";
    connection.query(sql, [email, hashPassword], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
    console.log(req.body);
  } catch {}
});

app.get("/users", (req, res) => {});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
