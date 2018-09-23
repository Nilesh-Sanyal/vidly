const mongoose = require('mongoose');
const Joi = require('joi');

const { genreModelSchema } = require('./genre');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    genre: {
        type: genreModelSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie){
    const schema = Joi.object().keys({
        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });

    return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;