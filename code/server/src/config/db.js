import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // If we fail to connect to DB, we log it, but in dev we might not want to exit if URI is bad placeholder
    process.exit(1);
    console.warn("Please provide a valid MongoDB Atlas URI in the .env file.");
  }
};

export default connectDB;
