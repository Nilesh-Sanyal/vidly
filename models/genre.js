const mongoose = require('mongoose');
const Joi = require('joi');
const genreModelSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genre = mongoose.model('genre', genreModelSchema);


function validateGenre(genre){
    const genreSchema = Joi.object().keys({
        name: Joi.string().min(5).max(50).required()
    });

    return Joi.validate(genre, genreSchema);

} 

module.exports.genreModelSchema = genreModelSchema;
module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;