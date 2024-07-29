CREATE DATABASE IF NOT EXISTS fitty;
USE fitty;
-- Bestehende Tabellen löschen, falls vorhanden
DROP TABLE IF EXISTS Stats;
DROP TABLE IF EXISTS Exercice;
DROP TABLE IF EXISTS Equip;
DROP TABLE IF EXISTS MuscleGroup;
DROP TABLE IF EXISTS Workout;
DROP TABLE IF EXISTS User;
-- Tabelle für Benutzer
CREATE TABLE IF NOT EXISTS User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);
-- Tabelle für Workouts
CREATE TABLE IF NOT EXISTS Workout (
    workout_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    start DATETIME NOT NULL,
end DATETIME NOT NULL,
FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE
);
-- Tabelle für Muskelgruppen
CREATE TABLE IF NOT EXISTS MuscleGroup (
    muscle_group_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE
);
-- Tabelle für Ausrüstung
CREATE TABLE IF NOT EXISTS Equip (
    equip_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    muscle_group_id INT,
    FOREIGN KEY (muscle_group_id) REFERENCES MuscleGroup(muscle_group_id) ON DELETE
    SET NULL
);
-- Tabelle für Übungen
CREATE TABLE IF NOT EXISTS Exercice (
    exercice_id INT AUTO_INCREMENT PRIMARY KEY,
    workout_id INT,
    equip_id INT,
    weight DOUBLE NOT NULL,
    sets INT,
    reps INT,
    FOREIGN KEY (workout_id) REFERENCES Workout(workout_id) ON DELETE CASCADE,
    FOREIGN KEY (equip_id) REFERENCES Equip(equip_id) ON DELETE
    SET NULL
);
-- Tabelle für Statistiken
CREATE TABLE IF NOT EXISTS Stats (
    stats_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    body_weight DOUBLE NOT NULL,
    size_biceps DOUBLE NOT NULL,
    train_sessions INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE
);
-- Optionale Indexe für Performance-Optimierung
CREATE INDEX IF NOT EXISTS idx_workout_user_id ON Workout(user_id);
CREATE INDEX IF NOT EXISTS idx_exercice_workout_id ON Exercice(workout_id);
CREATE INDEX IF NOT EXISTS idx_exercice_equip_id ON Exercice(equip_id);
CREATE INDEX IF NOT EXISTS idx_stats_user_id ON Stats(user_id);
-- Beispiel-Datensätze einfügen
INSERT INTO User (name)
VALUES ("Florian");
INSERT INTO User (name)
VALUES ("Sonja");