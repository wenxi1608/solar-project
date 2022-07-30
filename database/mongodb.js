const mongoose = require("mongoose");

// mongoose will also help initiate connection to the database

const connectionString =
  "mongodb+srv://wenxi1608:ner0enz0@cluster0.ghywbpy.mongodb.net/?retryWrites=true&w=majority"; //the connection from Mongo Atlas
const db = mongoose.connect(connectionString, { dbName: "solar" }); // estb connection

module.exports = db; // let us export db
