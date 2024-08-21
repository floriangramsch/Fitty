require("dotenv").config();

// Hilfsfunktion für Abfragen, die ein Promise zurückgibt
const query = (pool, sql, params) => {
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
const getAll = async (pool) => {
  try {
    const all = { equips: {}, workouts: {} };

    const equips = await getEquips(pool);
    all["equips"] = equips;
    all["users"] = await getUsers(pool);
    all["muscles"] = await getMuscles(pool);
    all["workouts"] = await getWorkouts(pool, equips);

    return all;
  } catch (err) {
    console.error(err);
  }
};

const getWorkouts = async (pool, equipList) => {
  const sql = `
      SELECT *
      FROM Workout w
      JOIN User u ON w.user_id = u.user_id
    `;

  const results = await query(pool, sql);

  const workouts = {};

  for (const row of results) {
    workouts[row.workout_id] = {
      start: row.start,
      end: row.end,
      user: {
        id: row.user_id,
        name: row.name,
      },
      equips: {},
    };
    for (const [key, value] of Object.entries(equipList)) {
      const weight = await getWeight(pool, row.workout_id, key);
      workouts[row.workout_id].equips[key] = weight;
    }
  }
  return workouts;
};

const getWeight = async (pool, workout_id, equip_id) => {
  const sql = `
    SELECT weight FROM Exercice e
    WHERE e.workout_id = ? AND e.equip_id = ?
    
  `;
  const exerciceResults = await query(pool, sql, [workout_id, equip_id]);

  return exerciceResults.length > 0 ? exerciceResults[0].weight : null;
};

const getEquips = async (pool) => {
  const sql = `
  SELECT equip_id, eq.name AS equip_name, m.name as muscle_name 
  FROM Equip eq
  LEFT JOIN MuscleGroup m 
  ON m.muscle_group_id = eq.muscle_group_id
`;
  const equipResults = await query(pool, sql, []);

  const equips = {};

  for (const row of equipResults) {
    equips[Number(row.equip_id)] = {
      equip_name: row.equip_name,
      equip_muscle_name: row.muscle_name,
      exercises: {}, // Initialisierung des exercises-Objekts
    };

    // Parallelisierung der Abfragen
    const [FloPB, SonjaPB, FloLast, SonjaLast] = await Promise.all([
      getPB(pool, row.equip_id, 1),
      getPB(pool, row.equip_id, 2),
      getLast(pool, row.equip_id, 1),
      getLast(pool, row.equip_id, 2),
    ]);

    equips[Number(row.equip_id)].FloPB = FloPB;
    equips[Number(row.equip_id)].SonjaPB = SonjaPB;
    equips[Number(row.equip_id)].FloLast = FloLast;
    equips[Number(row.equip_id)].SonjaLast = SonjaLast;
  }

  const exercises = await getExercises(pool);
  for (const row of exercises) {
    const equipId = Number(row.equip_id);
    if (!equips[equipId]["exercises"][row.user_id]) {
      equips[equipId]["exercises"][row.user_id] = {};
    }
    equips[equipId]["exercises"][row.user_id][row.exercice_id] = {
      weight: row.weight,
      start: row.start,
    };
  }

  return equips;
};

const getUsers = async (pool) => {
  const sql = `
  SELECT * 
  FROM User eq
  `;
  const results = await query(pool, sql, []);

  const users = {};
  for (const row of results) {
    users[row.user_id] = {
      name: row.name,
    };
  }
  return users;
};

const getMuscles = async (pool) => {
  const sql = `
  SELECT * 
  FROM MuscleGroup
  `;
  const results = await query(pool, sql, []);

  const muscles = {};
  for (const row of results) {
    muscles[Number(row.muscle_group_id)] = {
      muscle_name: row.name,
    };
  }
  return muscles;
};

const getExercises = async (pool) => {
  const sql = `
    Select e.equip_id, weight, start, user_id, e.exercice_id
    FROM Equip eq 
    LEFT JOIN Exercice e ON eq.equip_id = e.equip_id 
    LEFT JOIN Workout w ON e.workout_id = w.workout_id
    `;
  const results = await query(pool, sql, []);
  return results;
};

const getPB = async (pool, equip_id, user_id) => {
  const sql = `
    SELECT Max(e.weight) as PB FROM Exercice e
    LEFT JOIN Workout w ON w.workout_id = e.workout_id
    LEFT JOIN Equip eq ON eq.equip_id = e.equip_id
    WHERE e.equip_id = ? AND w.user_id = ?
  `;
  const results = await query(pool, sql, [equip_id, user_id]);
  return results[0].PB;
};

const getLast = async (pool, equip_id, user_id) => {
  const sql = `
    SELECT e.weight FROM Exercice e
    LEFT JOIN Workout w ON w.workout_id = e.workout_id
    LEFT JOIN Equip eq ON eq.equip_id = e.equip_id
    WHERE e.equip_id = ? AND w.user_id = ?
    ORDER BY w.start DESC
    LIMIT 1;
  `;
  const results = await query(pool, sql, [equip_id, user_id]);
  return results.length > 0 ? results[0].weight : null;
};

// getAll(pool);
module.exports = getAll;
