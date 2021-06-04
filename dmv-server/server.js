const http = require('http');
const app = require('./app');
require('dotenv').config();


const server = http.createServer(app);

server.listen(process.env.SERVER_PORT,()=>
{
    console.log("Server Started on PORT " + process.env.SERVER_PORT );
});