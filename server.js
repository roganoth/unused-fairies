// require("dotenv").config();
var express = require("express");
var path = require("path");
// var keys = require("./config/keys.js")


var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var routes = require("./controller/appController.js");

app.use(routes);

app.listen(PORT, function () {
    console.log("Server listening on : http://localhost:" + PORT);
});