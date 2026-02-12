const mongoose = require("mongoose");


const connectDatabase = async () => {
    try {
        const data = await mongoose.connect(process.env.DB_URL);
        console.log(`MongoDB Connected with server: ${data.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // stop server if DB fails
    }
};


module.exports = connectDatabase
