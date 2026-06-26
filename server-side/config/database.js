// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error("Database connection error:", error);
//     process.exit(1);
//   }
// };

// export default connectDB;
import mongoose from "mongoose";

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    // Store the promise immediately so concurrent requests wait for the same connection
    cachedConnection = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });
    
    await cachedConnection;
    console.log("✅ MongoDB connected");
    return cachedConnection;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    cachedConnection = null; // Reset on failure
    throw error; // NEVER process.exit() in Lambda
  }
};

export default connectDB;
