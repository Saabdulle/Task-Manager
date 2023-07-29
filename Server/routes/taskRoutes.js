const { Router } = require('express');
const taskController = require("../controllers/taskController")

const taskRouter = Router()


// Routes
taskRouter.get('/', taskController.index);
taskRouter.post('/', taskController.create);
taskRouter.get("/:id", taskController.show)
taskRouter.delete("/:id", taskController.destroy)
taskRouter.patch("/:id", taskController.updateTask);


module.exports = taskRouter;
