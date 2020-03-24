require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const movies = require('./movies-data-small.json');
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use(validateBearerToken);

function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');

  if (authToken && !authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(400).json({
      error: 'Invalid Authorization method: Must use Bearer strategy',
    });
  }

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }

  next();
}

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
