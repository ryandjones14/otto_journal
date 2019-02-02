
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Todo = require("./models/todos");
const cors = require('cors');

const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = `mongodb://dbuser:dbus3r@ds245523.mlab.com:45523/otto_journal`;

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

router.use(cors());

// this is our get method
// this method fetches all available data in our database
router.get("/todos", (req, res) => {
  Todo.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
// router.post("/updateData", (req, res) => {
//   const { id, update } = req.body;
//   Data.findOneAndUpdate(id, update, err => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

// // this is our delete method
// // this method removes existing data in our database
router.delete("/deleteTodo", (req, res) => {
  const { id } = req.body;
  Todo.findByIdAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// // this is our create methid
// // this method adds new data in our database
router.post("/addTodo", (req, res) => {
  let todo = new Todo();

  const { id, task, isComplete } = req.body;

  if ((!id && id !== 0) || !task) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  todo.id = id;
  todo.task = task;
  todo.isComplete = isComplete;

  todo.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));