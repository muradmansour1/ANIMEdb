const mongoose = require("mongoose");
const my_db = "anime-api"
mongoose.Promise = Promise;

const mongoURI = `mongodb://localhost/${my_db}`;
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(instance =>
    console.log(`Connected to db: ${instance.connections[0].name}`)
  )
  .catch(err => console.log("Connection Failed.", err));

module.exports = mongoose;