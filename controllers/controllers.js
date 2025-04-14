import dbPromise from "../db/db.js";

export const getClass = async (req, res) => {
  const db = await dbPromise;
  const rows = await db.all("SELECT * FROM classes");
  const result = rows.map(row => ({
    day: row.day,
    classes: JSON.parse(row.class_list),
  }));
  res.status(200).json(result);
};

export const getClassById = async (req, res) => {
  const id = parseInt(req.params.id);
  const db = await dbPromise;
  const row = await db.get("SELECT * FROM classes WHERE id = ?", [id]);

  if (!row) {
    return res.status(404).json({ message: "Class not found" });
  }

  res.status(200).json({ day: row.day, classes: JSON.parse(row.class_list) });
};

export const createClass = async (req, res) => {
  const { day, classes: classList } = req.body;
  if (!day || !Array.isArray(classList)) {
    return res.status(400).json({ message: "Missing or invalid data" });
  }

  const db = await dbPromise;
  await db.run("INSERT INTO classes (day, class_list) VALUES (?, ?)", [
    day,
    JSON.stringify(classList),
  ]);

  res.status(201).json({ day, classes: classList });
};

export const updateClass = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id < 0 || id >= classes.length) {
    return res.status(404).json({ message: "Class not found" });
  }
  const { day, classes: classList } = req.body;
  if (!day || !Array.isArray(classList)) {
    return res.status(400).json({ message: "Missing or invalid data" });
  }
  // Update the class at the specified id
  classes[id] = { day, classes: classList };
  res.status(200).json(classes[id]);
};


export const deleteClass = async (req, res) => {
  const id = parseInt(req.params.id);
  const db = await dbPromise;
  const existing = await db.get("SELECT * FROM classes WHERE id = ?", [id]);
  if (!existing) {
    return res.status(404).json({ message: "Class not found" });
  }

  await db.run("DELETE FROM classes WHERE id = ?", [id]);
  res.status(200).json({ message: "Delete successful" });
};
