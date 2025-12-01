const mongoose = require("mongoose")

const connectDatabase = () => {
mongoose.connect(process.env.MONGODB_URL)
    .then((data) => {
        console.log(`MongoDB connected: ${data.connection.host}`);
    })
    .catch((err) => {
        console.log("Database Connection Failed:", err);
    });

}



module.exports = connectDatabase;

