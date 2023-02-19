import { pool } from "../db.js"

export const getTasks = async (req, res) => {
  try {
    throw new Error("Error de prueba")
    const [result] = await pool.query(
      "SELECT * FROM tasks ORDER BY createdAt ASC"
    )
    res.json(result)
  } catch (error) {
    // throw new Error(error)
    return res.status(500).json({ message: "Something went wrong", error })
  }
}

export const getTask = async (req, res) => {
  try {
    const [existsTask] = await pool.query("SELECT * FROM tasks WHERE id = ?", [
      req.params.id,
    ])

    if (existsTask.length === 0)
      return res.status(404).json({ message: "Task not found" })
    res.json(existsTask[0])
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error })
  }
}
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body
    const [result] = await pool.query(
      "INSERT INTO tasks (title, description) VALUES (?, ?)",
      [title, description]
    )
    console.log("RESULLTADO----", result.insertId)
    res.json(result.insertId)
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error })
  }
}
export const updateTask = async (req, res) => {
  try {
    const [existsTask] = await pool.query("SELECT * FROM tasks WHERE id = ?", [
      req.params.id,
    ])
    if (existsTask.length === 0)
      return res.status(404).json({ message: "Task not found" })

    const [result] = await pool.query("UPDATE tasks SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ])
    console.log(result)
    res.send("Actualizando tareas")
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error })
  }
}
export const deleteTask = async (req, res) => {
  try {
    const [existsTask] = await pool.query("SELECT * FROM tasks WHERE id = ?", [
      req.params.id,
    ])
    if (existsTask.length === 0)
      return res.status(404).json({ message: "Task not found" })

    const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [
      req.params.id,
    ])
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ message: "Couldn't delete for some reason..." })

    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error })
  }
}
