import mongoose, { mongo } from "mongoose";
let isConnected = false;


export default async function connectDB() {
  mongoose.set('strictQuery',true)

    if (isConnected) {
    console.log("using existing connection");
    }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'prompt_db',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("new connection");
  } catch (error) {
    console.log(error);
  }
}