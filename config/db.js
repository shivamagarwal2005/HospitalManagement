const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://shivam_dbuser:Shivam%402428@cluster0.tkicdrq.mongodb.net/?appName=Cluster0"
    );

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;