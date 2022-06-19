import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

}, {
  versionKey: false
})

const Authors = mongoose.model("authors", AuthorSchema)

export default Authors