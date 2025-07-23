const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MoongoDB connected");

    }
    catch(err){
        console.log("Mongo error:",err.message);
        process.exit(1);

    }
}

module.exports = connectDB;