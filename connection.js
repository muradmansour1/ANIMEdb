const mongoose = require("mongoose");
require('dotenv').config()
// const my_db = "anime-api"
mongoose.Promise = Promise;

const mongoURI = process.env.MONGODB_URI || `mongodb://localhost/anime-api`;

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(instance =>
    console.log(`Connected to db: ${instance.connections[0].name}`)
  )
  .catch(err => console.log("Connection Failed.", err));

module.exports = mongoose;