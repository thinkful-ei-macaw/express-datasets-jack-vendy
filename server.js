require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const movies = require('./movies-data-small.json');
const app = express();

app.use(morgan('dev'));

app.get('/movie', (req, res) => {
  let moviesList = [...movies];
  let { genre, country, avg_vote } = req.query;

  if (genre) {
    genre = genre.toLowerCase();
    moviesList = moviesList.filter(movie => {
      return movie.genre.toLowerCase().includes(genre);
    });
  }
  if (country) {
    country = country.toLowerCase();
    moviesList = moviesList.filter(movie => {
      return movie.country.toLowerCase().includes(country);
    });
  }

  if (avg_vote) {
    avg_vote = +avg_vote;
    moviesList = moviesList.filter(movie => movie.avg_vote >= avg_vote);
  }

  res.json(moviesList);
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
