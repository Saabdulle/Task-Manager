const client = require("../database/client");
const { ObjectId } = require("mongodb");

class Task {
  constructor({ _id, title, description, createdAt }) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
  }

  static async getAll() {
    await client.connect();
    const cursor = await client.db("Tasks").collection("TasksManager").find();
    const data = await cursor.toArray();
    await client.close();
    return data.map((s) => new Task(s));
  }

  static async getOneById(id) {
    await client.connect();
    const data = await client.db("Tasks").collection("TasksManager").findOne({
      _id: new ObjectId(id),
    });
    await client.close();

    if (data._id) {
      return new Task(data);
    } else {
      throw new Error("Unable to locate task.");
    }
  }

  static async create(data) {
    await client.connect();
    const response = await client
      .db("Tasks")
      .collection("TasksManager")
      .insertOne(data);
    const newId = response.insertedId;
    const newDoc = await client
      .db("Tasks")
      .collection("TasksManager")
      .findOne({ _id: newId });
    await client.close();
    return new Task(newDoc);
  }

  async delete() {
    await client.connect();
    const response = await client
      .db("Tasks")
      .collection("TasksManager")
      .deleteOne({
        _id: new ObjectId(this._id),
      });
    await client.close();
    return response.deletedCount === 1;
  }

  static async updateTaskById(taskId, newData) {
    try {
      await client.connect();

      const collection = client.db("Tasks").collection("TasksManager");
      const filter = { _id: new ObjectId(taskId) };
      const updateData = { $set: newData };

      const result = await collection.updateOne(filter, updateData);

      console.log("Updated task:", result);

      if (result.modifiedCount === 1) {
        return 'Task updated successfully';
      } else {
        throw new Error('Task not found or not updated');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error('Failed to update task');
    } finally {
      // Close the client connection after the update is complete
      await client.close();
    }
  }
}

module.exports = Task;
