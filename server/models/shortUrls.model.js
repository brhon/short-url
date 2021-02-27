import mongoose from "mongoose";
const { Schema } = mongoose;

const shortUrlSchema = new Schema({
    shortUrl: String,
    redirect: String,
    views: Number,
});

export default mongoose.model("Shorturls", shortUrlSchema);
