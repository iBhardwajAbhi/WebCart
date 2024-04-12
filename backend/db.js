import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connection successful");
  } catch (error) {
    console.log("db connection failed");
  }
};

export default dbConnect;
