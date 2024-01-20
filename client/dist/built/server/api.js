"use strict";
/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
var express = require("express");
// import models so we can interact with the database
var User = require("./models/user");
// import authentication library
var auth = require("./auth");
// api endpoints: all these paths will be prefixed with "/api/"
var router = express.Router();
//initialize socket
var socketManager = require("./server-socket");
// Will Actually use Mongo later, this is just for testing purposes
var data = {
    smoothies: [
        {
            _id: "43aeb65f-eaa6-41e8-92c5-153eaae9d4e8",
            name: "Jan 29 Plan",
            owner: "c9bb8a85-9461-4907-a124-b0966fc8cf82",
        },
    ],
};
router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", function (req, res) {
    if (!req.user) {
        // not logged in
        return res.send({});
    }
    res.send(req.user);
});
router.get("/smoothie", function (req, res) {
    if (id in req) {
    }
    foundID = data.smoothies.find(function (smoothie) { return smoothie._id == req.id; });
    if (!foundID) {
        return res.status(404).send("Smoothie not found");
    }
    var smoothie = foundID;
    res.send(smoothie);
});
router.post("/initsocket", function (req, res) {
    // do nothing if user not logged in
    if (req.user)
        socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
    res.send({});
});
// |------------------------------|
// | write your API methods below!|
// |------------------------------|
// anything else falls to this "not found" case
router.all("*", function (req, res) {
    console.log("API route not found: ".concat(req.method, " ").concat(req.url));
    res.status(404).send({ msg: "API route not found" });
});
module.exports = router;
