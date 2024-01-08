const mongoose = require('mongoose')
const { stringify } = require('querystring')
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required:[true, "Username is required!"]
  },
  email: {
    type: String,
    required:[true, "Email is required!"],
    validate:{
      validator: val => /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test (val),
      message: "Please enter a valid email!"
    }
  },
  favorites: {
    type: [Object],
    default: [],
  }
  },
  {timestamps:true}
)
const User = mongoose.model('User', UserSchema)
module.exports = User
