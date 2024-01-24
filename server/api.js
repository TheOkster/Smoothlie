/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Smoothie = require("./models/smoothie.js");
const Task = require("./models/task.js");
const mongoose = require("mongoose");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

// const smoothieTest = new Smoothie({
//   name: "First Smoothie",
//   owner: "105388941574105185560",
//   tasks: [
//     {
//       startTimestamp: 1122145200,
//       endTimestamp: 5855655600,
//     },
//   ],
// });
// const taskTest = new Task({
//   name: "18.02A PSET 3",
//   owner: "105388941574105185560",
//   duration: 300,
//   notes: "",
//   source: "GCal",
// });
// smoothieTest.save();
// taskTest.save();
router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});
router.get("/smoothie", (req, res) => {
  // Didn't Bother for Now but could change into a function since
  // this and task use practically the same code
  if (!req.query._id) {
    return res.status(400).send({ error: "No ID selected" });
  }
  let parseableID;
  try {
    parseableID = mongoose.Types.ObjectId(req.query._id);
  } catch {
    return res.status(400).send({ message: "Invalid ID Type" });
  }
  Smoothie.findOne({ _id: parseableID })
    .then((smoothie) => {
      if (!smoothie) {
        return res.status(404).send({ message: "Smoothie with ID Not Found" });
      }
      res.send(smoothie);
    })
    .catch((err) => res.status(500).send(`Internal Server Error`));
});
router.get("/task", (req, res) => {
  if (!req.query._id) {
    return res.status(400).send({ error: "No ID selected" });
  }
  let parseableID;
  try {
    parseableID = mongoose.Types.ObjectId(req.query._id);
  } catch {
    return res.status(400).send({ message: "Invalid ID Type" });
  }
  Task.findOne({ _id: parseableID })
    .then((task) => {
      if (!task) {
        return res.status(404).send({ message: "Task with ID Not Found" });
      }
      res.send(task);
    })
    .catch((err) => res.status(500).send("Internal Server Error"));
});
router.get("/smoothies", (req, res) => {
  if (!req.query.owner) {
    return res.status(400).send({ error: "No Owner selected" });
  }
  Smoothie.find({ owner: req.query.owner })
    .then((smoothies) => {
      res.send({ smoothies });
    })
    .catch((err) => res.status(500).send("Internal Server Error"));
});
router.get("/tasks", (req, res) => {
  if (!req.query.owner) {
    return res.status(400).send({ error: "No Owner selected" });
  }
  Task.find({ owner: req.query.owner })
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((err) => res.status(500).send("Internal Server Error"));
});
router.post("/smoothie", (req, res) => {
  // TODO: Add error checking?
  const smoothie = new Smoothie({
    // In the future, we could add created date, authorized users, etc.
    name: req.body.name,
    owner: req.body.owner,
    timestamps: req.body.timestamps,
    events: req.body.events,
  });
  smoothie.save();
  res.send(smoothie);
});
router.post("/task", (req, res) => {
  const task = new Task({
    name: req.body.name,
    owner: req.body.owner,
    duration: req.body.duration,
    label: req.body.label,
    deadline: req.body.deadline,
    notes: req.body.notes,
    source: req.body.source,
  });
  task.save();
  res.send(task);
});
// TODO: Add Post endpoint to make it easier to add multiple smoothies/tasks at once?
router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
