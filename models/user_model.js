const mongoose = require('mongoose')
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
  // We created a table called favorite
  favorites: {
    type: [mongoose.Schema.Types.Object],
    ref: 'Anime',
  }
  },
  {timestamps:true}
)
const User = mongoose.model('User', UserSchema)
module.exports = User
