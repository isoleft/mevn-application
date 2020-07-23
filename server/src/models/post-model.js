const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  Name: {
    type: String,
    unique: true
  },
  Author: {
    type: String
  },
  Pages: {
    type: Number
  },
  Spec: {
    type: String
  },
  Date_in: {
    type: String
  },
  Image: {
    type: String
  }
})
const PostModel = mongoose.model('books', PostSchema)
module.exports = PostModel
