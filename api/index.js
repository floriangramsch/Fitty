const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, DELETE, OPTIONS",
    allowedHeaders: "Content-Type",
  })
);

// MariaDB-Verbindung einrichten
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

// Beispielroute
app.get("/", (req, res) => {
  res.send("Hello, this is the Fitty backend!");
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM User", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Equip
app.get("/equip", (req, res) => {
  db.query(
    `SELECT Equip.equip_id AS id, Equip.name AS name, MuscleGroup.name AS muscle
     FROM Equip 
     JOIN MuscleGroup ON Equip.muscle_group_id = MuscleGroup.muscle_group_id`,
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    }
  );
});
app.post("/addEquip", (req, res) => {
  const { name, muscle } = req.body;
  const muscleGroupId = muscle.muscle_group_id;

  db.query(
    "INSERT INTO Equip (name, muscle_group_id) VALUES (?, ?)",
    [name, muscleGroupId],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res
        .status(201)
        .json({ message: `Equip added with ID: ${results.insertId}` });
    }
  );
});

// Muscles
app.get("/muscles", (req, res) => {
  db.query("SELECT * FROM MuscleGroup", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});
app.post("/addMuscle", (req, res) => {
  const { newMuscle } = req.body;
  db.query(
    "INSERT INTO MuscleGroup (name) VALUES (?)",
    [newMuscle],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res
        .status(201)
        .send({ message: `Muscle added with ID: ${results.insertId}` });
    }
  );
});

// exercice
app.post("/addExercice", (req, res) => {
  const { workout_id, equip, weight } = req.body;
  db.query(
    "INSERT INTO Exercice (workout_id, equip_id, weight) VALUES (?, ?, ?)",
    [workout_id, equip.id, weight],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res
        .status(201)
        .send({ message: `Exercice added with ID: ${results.insertId}` });
    }
  );
});

// Weight
app.get("/weight/:workoutId/:equipId", (req, res) => {
  const { workoutId, equipId } = req.params;
  db.query(
    "SELECT weight FROM Exercice Where workout_id = ? AND equip_id = ?",
    [workoutId, equipId],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    }
  );
});

// Workout
app.post("/addWorkout", (req, res) => {
  const { user } = req.body;
  const dateTime = new Date();
  db.query(
    "INSERT INTO Workout (user_id, start, end) VALUES (?, ?, ?)",
    [user.user_id, dateTime, dateTime],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send({ message: `${results.insertId}` });
    }
  );
});

app.get("/resumeWorkout/:userId", (req, res) => {
  const { userId } = req.params;
  db.query(
    "SELECT * FROM Workout WHERE user_id = ? ORDER BY start DESC LIMIT 1",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      const workout = results[0];
      res.json(workout);
    }
  );
});

// Server starten
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
