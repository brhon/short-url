import mongoose from "mongoose";

const establishMongoConnection = async () => {
  await mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log("🎯 You are connected to the database !");
    }
  );
};

export default establishMongoConnection();
