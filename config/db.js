const mongoose = require("mongoose"); //load mongoose module
const config = require("config"); //load config module
const db = config.get("mongoURI"); //get config global variables created in default.json

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // ssl: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    }); //will return a promise
    console.log("Database connection successfully established");
  } catch (err) {
    console.error(err.message);
    console.log("Fatal Database Error")
    process.exit(1);
  }
};

module.exports = connectDB;
