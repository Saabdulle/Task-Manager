const client = require("../database/client")
const { ObjectId } = require("mongodb")

class Task {

  constructor({ _id, title, description, createdAt }){
    this._id = _id
    this.title = title
    this.description = description
    this.createdAt = createdAt
  }
  static async getAll(){
       // Open the connection
       await client.connect();
       //Get the ability to pull the data
       const cursor = await client.db("Tasks").collection("TasksManager").find();
      //  Pull the data
       const data = await cursor.toArray()
       //close the connection
       await client.close();
       // Get the data from the database
       console.log(data)
       return data.map(s => new Task(s));
   
  }
   static async getOneById (id) {

        await client.connect();

        const data = await client.db("Tasks").collection("TasksManager").findOne({
          _id: new ObjectId(id)
        });
        // console.log(ObjectId)
        // console.log(data)
        // Close connection
        await client.close();

        if (data._id) {
            // Wrangle the data
            return new Task(data);
        } else {
            throw new Error("Unable to locate task.");
        }
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
   async delete(data) {
    console.log(data)
         // Open the connection
         await client.connect();

         // Delete the doc
         const response = await client.db("Tasks").collection("TasksManager").deleteOne({
                                  _id : new ObjectId(this._id)
                                 });
 
         // Close the connection
         await client.close();
 
         if (response.deletedCount == 1) {

            return true;
         } else {
            return false;
         }
    }
}

module.exports = Task
