import mongoose from "mongoose";

const connectDb = async () => {
    const url: string = process.env.MONGO_URL || 'default_value'; 
  try {
    await mongoose.connect(url);
    console.log(`Connected To Database ${mongoose.connection.host}`);
  } catch (e) {
    console.log(`DB-Error: ${e}`);
  }
}

export default connectDb