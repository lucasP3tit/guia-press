const { urlencoded } = require("body-parser");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

//View Engine
app.set("view engine", "ejs");

//Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Static
app.use(express.static("public"));

//Database
connection.authenticate()
          .then(()=>{console.log("Database connected")})
          .catch(err=>console.log("Database connection error: ", err));
            
app.get("/", (req, res)=>{
    res.render("index");
});

app.listen(8081, ()=>{
    console.log("Server Running");
});
