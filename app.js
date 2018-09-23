const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const genre = require('./routes/genres');
const customer = require('./routes/customers');
const movie = require('./routes/movies');
const rental = require('./routes/rentals');
const user = require('./routes/users');
const auth = require('./routes/auth');
const Joi = require('joi');

const app = express();

const mongoose = require('mongoose');


if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
  }

mongoose.connect('mongodb://localhost/vidly')
        .then(() => console.log('Connected to mongodb successfully!'))
        .catch((err) => console.log('Error connecting to mongodb'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const port = 8000;

app.use('/api/genres', genre);
app.use('/api/customers', customer);
app.use('/api/movies', movie);
app.use('/api/rentals', rental);
app.use('/api/users', user);
app.use('/api/auth', auth);

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});


