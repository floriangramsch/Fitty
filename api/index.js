const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

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

app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM User", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Equip
app.get("/api/equip", (req, res) => {
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
app.post("/api/addEquip", (req, res) => {
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
app.get("/api/muscles", (req, res) => {
  db.query("SELECT * FROM MuscleGroup", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});
app.post("/api/addMuscle", (req, res) => {
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
app.post("/api/addExercice", (req, res) => {
    const { user, equip, weight } = req.body;
    // const muscleGroupId = muscle.muscle_group_id;
    // const { newMuscle } = req.body;
    db.query(
      "INSERT INTO Exercice (workout_id, equip_id, weight) VALUES (?, ?, ?)",
      [user.user_id, equip.id, weight],
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
app.get("/api/weight/:id/:equipId", (req, res) => {
    const { id, equipId } = req.params;
    db.query("SELECT weight FROM Exercice Where workout_id = ? AND equip_id = ?", [id, equipId], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });

// Server starten
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
