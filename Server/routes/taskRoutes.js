const { Router } = require('express');
const taskController = require("../controllers/taskController")

const taskRouter = Router()


// Routes
taskRouter.get('/', taskController.index);
taskRouter.post('/', taskController.create);


module.exports = taskRouter;
