require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const movies = require('./movies-data-small.json');
const app = express();


app.use(morgan('dev'));

app.get('/movie', (req,res)=>{
  let moviesList = [...movies];
  let genre = req.query.genre.toLowerCase();

  if(genre){
    moviesList = moviesList.filter(movie =>{
      console.log(movie.genre.toLowerCase(), genre);
      return movie.genre.toLowerCase().includes(genre);
    });
  }
  res.json(moviesList);
});


const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});