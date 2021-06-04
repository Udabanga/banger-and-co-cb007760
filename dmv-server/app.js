//importing server 
const express = require('express');
const app = express();

//Connecting to the database
require('dotenv').config();

        
//import Middleware
const cors = require('cors');
const morgan = require("morgan");
const bodyParser = require('body-parser');

//Set middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

   
//API Origin access 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header',
        'Origin , X-Requested, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use(express.static('./uploads'));

//error handling for invalid endpoints
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  

// sending an error to the client
app.use((error, req, res, next) => {
res.status(error.status || 500);
res.json({
    error: {
    message: error.message
    }
});
});

module.exports = app;