const mongoose = require('mongoose')

const animeSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  desc: {
    type: String
  },
  img: {
    data: Buffer,
    contentType: String
  },
})

const Anime = mongoose.model("Anime", animeSchema)

module.exports = Anime;