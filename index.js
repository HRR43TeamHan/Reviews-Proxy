const express = require('express');
const app = express();
const axios = require('axios');

const PORT = process.env.FEC_PROXY_PORT || 8080
const BOOKING_PORT = process.env.BOOKING_PORT || 50003
const BOOKING_HOSTNAME = process.env.BOOKING_HOSTNAME || 'localhost';
const CAROUSEL_PORT = process.env.CAROUSEL_PORT || 50002
const CAROUSEL_HOSTNAME = process.env.CAROUSEL_HOSTNAME || 'localhost';
const ABOUT_PORT = process.env.ABOUT_PORT || 50001
const ABOUT_HOSTNAME = process.env.ABOUT_HOSTNAME || 'localhost';
const REVIEWS_PORT = process.env.REVIEWS_PORT || 50000
const REVIEWS_HOSTNAME = process.env.REVIEWS_HOSTNAME || 'localhost';

app.use(express.json());

// app.use('/:id', express.static(__dirname + '/public'));

const static = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://file.myfontastic.com/U8sGaLdnvhHsK7t6kuKpPn/icons.css" rel="stylesheet" />
    <script src="https://kit.fontawesome.com/4723f324c2.js" crossorigin="anonymous"></script>
    <title>HRR43 FEC TeamHan!</title>
    </head>
    <body>
    <div style="margin: 0 6% 0 6%;">
    <div style="display:flex">
    <div id="booking" ></div>
    <div id="carousel" ></div>
    </div>
    <div id="about"></div>
    <div id="reviews"></div>
    </div>
    <script src="http://${BOOKING_HOSTNAME}:${BOOKING_PORT}/bundle.js" ></script>
    <script src="http://${CAROUSEL_HOSTNAME}:${CAROUSEL_PORT}/bundle.js" ></script>
    <script src="http://${ABOUT_HOSTNAME}:${ABOUT_PORT}/bundle.js" ></script>
    <script src="http://${REVIEWS_HOSTNAME}:${REVIEWS_PORT}/bundle.js" ></script>
  </body>
</html>`



app.post('/api/booking/:id', (req, res) => {
  axios.post(`http://${BOOKING_HOSTNAME}:${BOOKING_PORT}${req.url}`, {...req.body})
  .then(response => response.data)
  .then(data => res.send(data))
  .catch(err => console.log('error at proxy serving about',err));
});


app.get('/api/carousel/:id', (req, res) => {
  axios.get(`http://${CAROUSEL_HOSTNAME}:${CAROUSEL_PORT}${req.url}`)
  .then(response => response.data)
  .then(data => res.send(data))
  .catch(err => console.log('error at proxy serving about',err));
});

app.get('/api/about/:id', (req, res) => {
  axios.get(`http://${ABOUT_HOSTNAME}:${ABOUT_PORT}${req.url}`)
  .then(response => response.data)
  .then(data => res.send({data}))
  .catch(err => console.log('error at proxy serving about',err));
});

app.get('/api/reviews/:id', (req, res) => {
  axios.get(`http://${REVIEWS_HOSTNAME}:${REVIEWS_PORT}${req.url}`)
  .then(response => response.data)
  .then(data => res.send(data))
  .catch(err => console.log('error at proxy serving about',err));
});

app.get('/:id', function(req, res) {
  res.send(static);
})
let portReport = (!process.env.BOOKING_PORT) ? "undefined" : BOOKING_PORT;
console.log(`Booking proxy module accessing port:${BOOKING_PORT}`);
console.log('BOOKING_PORT Environnment Variable is', portReport,"\n");

portReport = (!process.env.CAROUSEL_PORT) ? "undefined" : CAROUSEL_PORT;
console.log(`Carousel proxy module accessing port:${CAROUSEL_PORT}`);
console.log('CAROUSEL_PORT Environnment Variable is', portReport,"\n");

portReport = (!process.env.ABOUT_PORT) ? "undefined" : ABOUT_PORT;
console.log(`About proxy module accessing port:${ABOUT_PORT}`);
console.log('ABOUT_PORT Environnment Variable is', portReport,"\n");

portReport = (!process.env.REVIEWS_PORT) ? "undefined" : REVIEWS_PORT;
console.log(`Reviews proxy module accessing port:${REVIEWS_PORT}`);
console.log('REVIEWS_PORT Environnment Variable is', portReport,"\n");

app.listen(PORT, console.log(`Listening on port ${PORT}`));