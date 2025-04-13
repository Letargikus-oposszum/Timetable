import classes from "../data/data.js";

export const getClass = (req, res) => {
  res.status(200).json(classes);
};

export const getClassById = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id < 0 || id >= classes.length) {
    return res.status(404).json({ message: "Class not found" });
  }
  res.status(200).json(classes[id]);
};

export const createClass = (req, res) => {
  const { day, classes: classList } = req.body;
  if (!day || !Array.isArray(classList)) {
    return res.status(400).json({ message: "Missing or invalid data" });
  }
  const newClass = { day, classes: classList };
  classes.push(newClass);
  res.status(201).json(newClass);
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
  classes[id] = { day, classes: classList };
  res.status(200).json(classes[id]);
};

export const deleteClass = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id < 0 || id >= classes.length) {
    return res.status(404).json({ message: "Class not found" });
  }
  classes.splice(id, 1);
  res.status(200).json({ message: "Delete successful" });
};
