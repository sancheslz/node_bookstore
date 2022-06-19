import mongoose from "mongoose";

const dbURI = process.env.MONGODB_URI
if (!dbURI) {
  throw new Error("MONGODB_URI is not defined");
}
mongoose.connect(dbURI)

const db = mongoose.connection;

export default db
