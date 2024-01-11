const cookieParser = require("cookie-parser");
const express = require("express")
const app = express()
const port = 8000
require('dotenv').config();
// const animes = [
//   {title: "One Piece", genre: "Action"},
//   {title: "Narato", genre: "Drama"},
//   {title: "Luffy", genre: "Action"},
//   {title: "Dragon Ball", genre: "Funny"},
//   {title: "Demon Slayer", genre: "Action"}
// ]

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
// app.get("/api/title/:id", (req, res)=>{
//   res.json({
//     count: req.params.id,
//     title: animes[req.params.id]
//   })
// })

require('./routes/user.routes')(app)
require('./front-end/app')(app)
require('./connection');


app.listen(port, () => console.log(`listening on port: ${port}`))