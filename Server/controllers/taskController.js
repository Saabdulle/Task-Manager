const Task = require('../models/task');

const index = async (req, res) => {
  try {
    const data = await Task.getAll();
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500);
    res.json("Unable to retrieve tasks.");
  }
};

const show = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Task.getOneById(id);
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(404);
    res.json({
      error: true,
      message: "Unable to locate task."
    });
  }
};

const create = async (req, res) => {
  try {
    const data = await Task.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Error creating task" });
  }
};

const destroy = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Task.getOneById(id);
    const deleted = await doc.delete();
    if (deleted) {
      res.sendStatus(204);
    } else {
      throw new Error("Unable to delete task.");
    }
  } catch (err) {
    console.log(err.message);
    res.status(400);
    res.json("Unable to delete task.");
  }
};

async function updateTask(req, res) {
  try {
    const { taskId } = req.params; // Extract taskId from the URL parameters
    const newData = req.body; // Assuming the request body contains the updated data

    // Ensure that newData contains only the fields you want to update
    const allowedFields = ['title', 'description', 'createdAt'];
    const updatedData = {};
    for (const field of allowedFields) {
      if (newData[field] !== undefined) {
        updatedData[field] = newData[field];
      }
    }

    // Call the Task model's updateTaskById method to update the document
    const result = await Task.updateTaskById(taskId, updatedData);

    // Send a success response to the client
    return res.status(200).json({ message: `Task updated successfully to: ${result}` });

  } catch (error) {
    // If there's an error, handle it and send an error response
    console.error('Error updating task:', error);
    return res.status(500).json({ error: 'Failed to update task' });
  }
}

module.exports = { index, show, create, destroy, updateTask };
