const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Hilfsfunktion für Abfragen, die ein Promise zurückgibt
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Hauptfunktion, die die Workouts und dazugehörige Exercices abfragt
const getWorkouts = async () => {
  try {
    const sql = `
      SELECT *
      FROM Workout w
      JOIN User u ON w.user_id = u.user_id
    `;

    const workoutResults = await query(sql);

    const workouts = { equips: {}, workouts: {} };
    const equips = await getEquips();
    workouts["equips"] = equips;

    for (const row of workoutResults) {
      workouts["workouts"][row.workout_id] = {
        start: row.start,
        end: row.end,
        user: {
          id: row.user_id,
          name: row.name,
        },
        equips: {},
      };
      for (const [key, value] of Object.entries(equips)) {
        const weight = await getWeight(row.workout_id, key);
        workouts["workouts"][row.workout_id].equips[key] = weight;
      }
    }

    return workouts;
  } catch (err) {
    console.error(err);
  }
};

const getWeight = async (workout_id, equip_id) => {
  const sql = `
    SELECT weight FROM Exercice e
    WHERE e.workout_id = ? AND e.equip_id = ?
    
  `;
  const exerciceResults = await query(sql, [workout_id, equip_id]);

  return exerciceResults.length > 0 ? exerciceResults[0].weight : null;
};

const getEquips = async () => {
  const sql = `
  SELECT * FROM Equip
`;
  const equipResults = await query(sql, []);

  const equips = {};

  for (const row of equipResults) {
    equips[row.equip_id] = {
      equip_name: row.name,
      FloPB: await getPB(row.equip_id, 1),
      SonjaPB: await getPB(row.equip_id, 2),
      FloLast: await getLast(row.equip_id, 1),
      SonjaLast: await getLast(row.equip_id, 2),
    };
  }

  return equips;
};

const getPB = async (equip_id, user_id) => {
  const sql = `
    SELECT Max(e.weight) as PB FROM Exercice e
    LEFT JOIN Workout w ON w.workout_id = e.workout_id
    LEFT JOIN Equip eq ON eq.equip_id = e.equip_id
    WHERE e.equip_id = ? AND w.user_id = ?
  `;
  const results = await query(sql, [equip_id, user_id]);
  return results[0].PB;
};

const getLast = async (equip_id, user_id) => {
  const sql = `
    SELECT e.weight FROM Exercice e
    LEFT JOIN Workout w ON w.workout_id = e.workout_id
    LEFT JOIN Equip eq ON eq.equip_id = e.equip_id
    WHERE e.equip_id = ? AND w.user_id = ?
    ORDER BY w.start DESC
    LIMIT 1;
  `;
  const results = await query(sql, [equip_id, user_id]);
  return results.length > 0 ? results[0].weight : null;
};

// getWorkouts();
module.exports = getWorkouts;
// All
// {
//   1: {
//     start/end:
//     user:
//       user_id: 1
//       user_name: Flo
//     equipList:
//       This: 1
//       FloPB:
//         abs: 6,
//         brust: 3
//       SonjaPB:
//         abs: 3
//         brust: 4
//   },
//   2: {

//   }
// }
