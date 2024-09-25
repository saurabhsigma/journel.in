const mongoose = require("mongoose");


const connectDB = async () =>{
    try {
        await mongoose.connect("mongodb+srv://saurabh:EvKJuuNxtsxWGxd0@cluster0.e8d2pel.mongodb.net/journel");
        console.log("MongoDB connected");
    }catch(error){
        console.error("MongoDb connection error: ", error);
        process.exit(1);
    }
};

module.exports = connectDB;