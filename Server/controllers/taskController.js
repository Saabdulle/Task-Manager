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

const createTask = async (req, res) => {
  try {
    const data = req.body; // Get the task data from the request body

    // Add the createdAt field with the current date in ISO 8601 format
    data.createdAt = new Date().toISOString();

    const newTask = await Task.create(data); // Call the create method in your Task model
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
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

module.exports = { index, show, createTask, destroy, updateTask };
