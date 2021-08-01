const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require('body-parser')
const routes = require("./route/router");
const conf = require("./conf")
const app = express();
mongoose
    .connect(conf.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
        app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
        app.use(bodyParser.text({ type: 'text/html' }))
        app.use(function(req, res, next) {

            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        app.use("/api", routes);

        app.listen(5000, () => {
            console.log("DB Connected !!!");
        });
    });