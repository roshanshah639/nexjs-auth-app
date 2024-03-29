import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    // Check if connection is successful
    connection.on("connected", () => {
      console.log("MongoDB Connected Successfully!");
    });

    // Check on errors
    connection.on("error", (error: any) => {
      console.log("MongoDB Connection Failed!", error.message);
      // exit process with failure
      process.exit(1);
    });
  } catch (error: any) {
    console.log(
      "MongoDB Connection Failed! Make sure MongoDB is running!",
      error.message
    );
  }
};

export default connectDB;
