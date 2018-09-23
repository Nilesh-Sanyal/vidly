const express = require('express');
const mongoose = require('mongoose');
const { Movie,validateMovie  } = require('../models/movie');
const { Genre } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

router.get('/', async(req, res) =>{
    const movies = await Movie.find({});
    res.status(200).send({secret:secret, movies: movies});
});

router.get('/:id', async(req, res) =>{

    const movieId = req.params.id;

    const movie = await Movie.findById(movieId);

    if(!movie)
        return res.status(404).send('Movie not found for that specific id');
    res.send({movie: movie});

});

router.post('/', auth, async(req, res) =>{

    const { error } = validateMovie(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre)
        res.status(400).send('Invalid genre');
    
    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id : genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie = await movie.save();

    res.send(movie);
});

router.put('/:id', auth, async(req, res) =>{

    const { error } = validateMovie(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre');
    
    const movie = await Movie.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    },{
        new: true
    });
    if(!movie)
        return res.status(404).send('The movie with the given ID was not found');
    res.status(201).send(movie);
});

router.delete('/:id', [auth,admin], async(req, res) =>{

    const movieId = req.params.id;

    const movie = await Movie.findByIdAndDelete(movieId);

    if(!movie)
        res.status(404).send('The movie with the given ID was not found.');
    else
        res.send(movie);

});

module.exports = router;
