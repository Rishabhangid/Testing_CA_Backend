// IMPORTING MODULES
const express = require("express");
const app =express();
const cors = require("cors");
const bodyParser = require("body-parser") 

const dotenv = require("dotenv"); 
dotenv.config({path:"./config.env"}); // IMPORTING ENV FILE

require("./dbconnection/connection"); // DB CONNECTION
const cors_option = {
    origin: "*",
    credential: true
}
app.use(cors(cors_option)); // CORS
app.use(express.json()); // CONVERT RESPONSE TO JSON


app.use(require("./routes/route")); // IMPORTING ROUTES

const PORT = process.env.PORT;
app.listen(PORT, ()=>{console.log(`Server started at port no: ${PORT}`)}) // STARTING SERVER

