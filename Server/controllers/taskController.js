const Task = require('../models/task');

async function index(req, res) {
 try {

   const data = await Task.getAll();
   res.json(data)
  
}catch (err) {
  console.log(err.message);
  res.status(500);
  res.json("Unable to retrieve tasks.")
}}
async function show(req, res) {
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
      })
  }
}
async function create(req, res) {
  console.log("controller")
  const data = await Task.create(req.body);
  res.status(201).json(data)
}
async function destroy(req, res) {
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
      res.json("Unable to delete task.")
  }    
}

module.exports = {
  index, show, create, destroy
}
