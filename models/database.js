const mongoose = require('mongoose');

exports.connectdb = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected");
    } catch (error) {
        console.log("error db connection");
    }
}