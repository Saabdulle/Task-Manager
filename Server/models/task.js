const client = require("../database/client")

class Task {
  constructor({_id, title, description, createdAt}){
    this._id = _id
    this.title = title
    this.description = description
    this.createdAt = createdAt
  }
  static async getAll(){
       // Open the connection
       await client.connect();
       // Pull the data
       const cursor = await client.db("Tasks").collection("TasksManager").find();
       const data = await cursor.toArray()
       //close the connection
       await client.close();
       // Get the data from the database
       console.log(data)
       return data.map(s => new Task(s));
   
  }
  static async create (data) {


    console.log(data);
    // Open the connection
     await client.connect();
    // Insert the doc
     const response = await client.db("Tasks").collection("TasksManager").insertOne(data);
    
     console.log(response);
     //get the Id
     const newId = response.insertedId;
    
     // Get the new doc
    const newDoc = await client.db("Tasks").collection("TasksManager").findOne({ _id: newId })
    
    //close the connection
    await client.close();
    
    // Get the data from the database

    return new Task(newDoc)
}
}

module.exports = Task
