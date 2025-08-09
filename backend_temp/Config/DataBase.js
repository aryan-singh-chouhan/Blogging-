import mongoose from "mongoose";

const DatabaseConnect = async () => {
  try {
    console.log("Starting database connection...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully!");
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

// Export the function
export default DatabaseConnect;
