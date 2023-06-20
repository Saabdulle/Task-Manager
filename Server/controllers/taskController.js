const Task = require('../models/task');

async function index(req, res) {
  const data = await Task.getAll();
  res.json(data)
}
async function create(req, res) {
  console.log("controller")
  const data = await Task.create(req.body);
  res.status(201).json(data)
}

module.exports = {
  index, create
}
