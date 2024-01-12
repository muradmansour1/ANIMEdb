const cookieParser = require("cookie-parser");
const express = require("express")
const app = express()
const cors = require('cors')
// const port = 8000
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
const corsOptions = {
  origin: 'http://127.0.0.1:5500', // Replace with your front-end's origin
  credentials: true, // This is important for credentials mode 'include'
};
app.use(cors(corsOptions));
// app.get("/api/title/:id", (req, res)=>{
//   res.json({
//     count: req.params.id,
//     title: animes[req.params.id]
//   })
// })

require('./routes/user.routes')(app)
//require('./front-end/app')(app)
require('./connection');

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
 console.log(`listening on port: ${port}`)
});