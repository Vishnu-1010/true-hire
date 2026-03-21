import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("sucessfully connected");
  } catch (error) {
    console.log("failed to connect db");
    process.exit(1);
  }
};
mongoose.connection.on("connected", () => {
  console.log("connected to database");
});
mongoose.connection.on("error", (err) => {
  console.log("error  to connect database", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("user disconnected");
});
export default connectDB;
