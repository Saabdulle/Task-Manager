const express = require('express');
const cors = require("cors")

const app = express()

const taskRouter = require("./Routes/taskRoutes")

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Task Manager API"
    })
})

app.use("/tasks", taskRouter)

module.exports = app

