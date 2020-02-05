const express = require('express');
const app = express();
const axios = require('axios');

const PORT = process.env.FEC_PROXY_PORT || 8080
const BOOKING_PORT = process.env.BOOKING_PORT || 50003
const CAROUSEL_PORT = process.env.CAROUSEL_PORT || 50002
const ABOUT_PORT = process.env.ABOUT_PORT || 50001
const REVIEWS_PORT = process.env.REVIEWS_PORT || 50000

app.use(express.json());

// app.use('/:id', express.static(__dirname + '/public'));

const static = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://kit.fontawesome.com/92139872d0.js" crossorigin="anonymous"></script>
    <title>HRR43 FEC TeamHan!</title>
  </head>
  <body>

    <div id="booking"></div>
    <div id="carousel"></div>
    <div id="about"></div>
    <div id="reviews"></div>

    <script src="http://localhost:${BOOKING_PORT}/bundle.js" ></script>
    <script src="http://localhost:${CAROUSEL_PORT}/bundle.js" ></script>
    <script src="http://localhost:${ABOUT_PORT}/bundle.js" ></script>
    <script src="http://localhost:${REVIEWS_PORT}/bundle.js" ></script>

  </body>
</html>`


app.get('/:id', function(req, res) {
  res.send(static);
})

app.get('/api/booking/:id', (req, res) => {
  axios.get(`http://localhost:${BOOKING_PORT}${req.url}`)
  .then(response => response.data)
  .then(data => res.send(data))
  .catch(err => console.log('error at proxy serving about',err));
});

app.get('/api/carousel/:id', (req, res) => {
  axios.get(`http://localhost:${CAROUSEL_PORT}${req.url}`)
  .then(response => response.data)
  .then(data => res.send(data))
  .catch(err => console.log('error at proxy serving about',err));
});

app.get('/api/about/:id', (req, res) => {
  axios.get(`http://localhost:${ABOUT_PORT}${req.url}`)
  .then(response => response.data)
  .then(data => res.send(data))
  .catch(err => console.log('error at proxy serving about',err));
});

app.get('/api/reviews/:id', (req, res) => {
  axios.get(`http://localhost:${REVIEWS_PORT}${req.url}`)
  .then(response => response.data)
  .then(data => res.send(data))
  .catch(err => console.log('error at proxy serving about',err));
});

app.listen(PORT, console.log(`Listening on port ${PORT}`));