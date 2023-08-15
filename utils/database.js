import mongoose from "mongoose";

let isConnected = false; //for connection status

export async function connectDb() {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDb is connected");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "next_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
  } catch (error) {
    console.log(error);
    isConnected = false;
  }
}
