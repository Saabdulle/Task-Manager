// const client = require("../database/client")
// const { ObjectId } = require("mongodb")
// const mongoose = require('mongoose');

// // Define the Task schema
// class Task {

//   constructor({ _id, title, description, createdAt }){
//     this._id = _id
//     this.title = title
//     this.description = description
//     this.createdAt = createdAt
//   }
//   static async getAll(){
//        // Open the connection
//        await client.connect();
//        //Get the ability to pull the data
//        const cursor = await client.db("Tasks").collection("TasksManager").find();
//       //  Pull the data
//        const data = await cursor.toArray()
//        //close the connection
//        await client.close();
//        // Get the data from the database
//        console.log(data)
//        return data.map(s => new Task(s));
   
//   }
//    static async getOneById (id) {

//         await client.connect();

//         const data = await client.db("Tasks").collection("TasksManager").findOne({
//           _id: new ObjectId(id)
//         });
//         // console.log(ObjectId)
//         // console.log(data)
//         // Close connection
//         await client.close();

//         if (data._id) {
//             // Wrangle the data
//             return new Task(data);
//         } else {
//             throw new Error("Unable to locate task.");
//         }
//     }
//   static async create (data) {


//     console.log(data);
//     // Open the connection
//      await client.connect();
//     // Insert the doc
//      const response = await client.db("Tasks").collection("TasksManager").insertOne(data);
    
//      console.log(response);
//      //get the Id
//      const newId = response.insertedId;
    
//      // Get the new doc
//     const newDoc = await client.db("Tasks").collection("TasksManager").findOne({ _id: newId })
    
//     //close the connection
//     await client.close();
    
//     // Get the data from the database

//     return new Task(newDoc)
// }
//    async delete(data) {
//     console.log(data)
//          // Open the connection
//          await client.connect();

//          // Delete the doc
//          const response = await client.db("Tasks").collection("TasksManager").deleteOne({
//                                   _id : new ObjectId(this._id)
//                                  });
 
//          // Close the connection
//          await client.close();
 
//          if (response.deletedCount == 1) {

//             return true;
//          } else {
//             return false;
//          }
//     }
//     static async updateTaskById(taskId, newData) {
//       try {

//         const updatedTask = await this.findOneAndUpdate({ _id: taskId }, newData, { new: true });
    
//         return updatedTask;
//       } catch (error) {
//         throw new Error("Failed to update task");
//       }
//     }
    
// }

// module.exports = Task
// const { ObjectId } = require("mongodb");
// const mongoose = require('mongoose');
// const client = require("../database/client");

// // Define the Task schema
// const taskSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// // Create the Task model using the schema
// const TaskModel = mongoose.model('Task', taskSchema);

// // Define the Task class
// class Task {

//   constructor({ _id, title, description, createdAt }){
//     this._id = _id
//     this.title = title
//     this.description = description
//     this.createdAt = createdAt
//   }

//   static async getAll(){
//     await client.connect();
//     const cursor = await client.db("Tasks").collection("TasksManager").find();
//     const data = await cursor.toArray();
//     await client.close();
//     return data.map(s => new Task(s));
//   }

//   static async getOneById (id) {
//     await client.connect();
//     const data = await client.db("Tasks").collection("TasksManager").findOne({
//       _id: new ObjectId(id)
//     });
//     await client.close();

//     if (data._id) {
//       return new Task(data);
//     } else {
//       throw new Error("Unable to locate task.");
//     }
//   }

//   static async create (data) {
//     await client.connect();
//     const response = await client.db("Tasks").collection("TasksManager").insertOne(data);
//     const newId = response.insertedId;
//     const newDoc = await client.db("Tasks").collection("TasksManager").findOne({ _id: newId });
//     await client.close();
//     return new Task(newDoc);
//   }

//   async delete() {
//     await client.connect();
//     const response = await client.db("Tasks").collection("TasksManager").deleteOne({
//       _id : new ObjectId(this._id)
//     });
//     await client.close();
//     return response.deletedCount === 1;
//   }


//   // static async updateTaskById(taskId, newData) {
//   //   try {


//   //       await client.connect();

  
//   //     const collection = client.db('Tasks').collection('TasksManager');
//   //     const filter = { _id: new ObjectId(taskId) };
//   //     const updateData = { $set: newData };
  
//   //     const result = await collection.updateOne(filter, updateData);
  
//   //     console.log('Updated task:', result); 
  
//   //     if (result.modifiedCount === 1) {
//   //       return 'Task updated successfully';
//   //     } else {
//   //       throw new Error('Task not found or not updated');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error updating task:', error);
//   //     throw new Error('Failed to update task');
//   //   } finally {
//   //     // Close the client connection after the update is complete
//   //     await client.close();
//     }
//   // }}  

// module.exports = Task;
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
