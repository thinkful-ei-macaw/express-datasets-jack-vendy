require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const movies = require('./movies-data-small.json');
const app = express();


app.use(morgan('dev'));

app.get('/movie', (req,res)=>{
  let moviesList = [...movies];
  let { genre, country}   = req.query;
  

  if(genre){
    genre=genre.toLowerCase();
    moviesList = moviesList.filter(movie =>{
      console.log(movie.genre.toLowerCase(), genre);
      return movie.genre.toLowerCase().includes(genre);
    });
  }
  if(country){
    country=country.toLowerCase();
    moviesList = moviesList.filter(movie =>{
      return movie.country.toLowerCase().includes(country);
    });
  }
  res.json(moviesList);
});


const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});