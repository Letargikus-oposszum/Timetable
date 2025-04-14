import dbPromise from "../db/db.js";

export const getClass = async (req, res) => {
  const db = await dbPromise;
  const rows = await db.all("SELECT * FROM classes");

  const result = rows.map(row => ({
    id: row.id,
    day: row.day,
    classes: JSON.parse(row.class_list),
  }));

  res.status(200).json(result);
};

export const getClassById = async (req, res) => {
  const db = await dbPromise;
  const id = parseInt(req.params.id);
  const row = await db.get("SELECT * FROM classes WHERE id = ?", [id]);

  if (!row) return res.status(404).json({ message: "Class not found" });

  res.status(200).json({
    id: row.id,
    day: row.day,
    classes: JSON.parse(row.class_list),
  });
};

export const createClass = async (req, res) => {
  const db = await dbPromise;
  const { day, classes } = req.body;

  if (!day || !Array.isArray(classes)) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const result = await db.run(
    "INSERT INTO classes (day, class_list) VALUES (?, ?)",
    [day, JSON.stringify(classes)]
  );

  res.status(201).json({ id: result.lastID, day, classes });
};
export const updateClass = async (req, res) => {
  const db = await dbPromise;
  const id = parseInt(req.params.id);  // Use the database ID from the route params
  const { day, classes } = req.body;   // Extract day and classes from the request body

  // Validate input
  if (!day || !Array.isArray(classes)) {
    return res.status(400).json({ message: "Invalid input. Day and classes are required." });
  }

  // Check if the class with the provided ID exists in the database
  const check = await db.get("SELECT * FROM classes WHERE id = ?", [id]);
  if (!check) {
    return res.status(404).json({ message: "Class not found" });
  }

  // Update the class in the database
  await db.run(
    "UPDATE classes SET day = ?, class_list = ? WHERE id = ?",
    [day, JSON.stringify(classes), id]
  );

  // Return the updated class data in the response
  res.status(200).json({ id, day, classes });
};
export const deleteClass = async (req, res) => {
  const db = await dbPromise;
  const id = parseInt(req.params.id);  // Use the database ID from the route params

  // Check if the class with the provided ID exists in the database
  const check = await db.get("SELECT * FROM classes WHERE id = ?", [id]);
  if (!check) {
    return res.status(404).json({ message: "Class not found" });
  }

  // Delete the class from the database
  await db.run("DELETE FROM classes WHERE id = ?", [id]);

  // Respond with a success message
  res.status(200).json({ message: "Delete successful" });
};

