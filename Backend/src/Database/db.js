import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config({
    path:'./env'
})

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(`\nMongoDB connected`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    
  }
};

export default connectDB;

