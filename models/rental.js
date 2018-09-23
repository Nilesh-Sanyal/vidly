const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const { customerModelSchema } = require('./customer');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: customerModelSchema,
        required: true
    },

    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                minlength: 5,
                maxlength: 255,
                required: true
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },

    dateOut: {
        type: Date,
        default: Date.now,
        required: true
    },

    dateReturned: {
        type: Date
    },

    rentalFee: {
        type: Number,
        min: 0
    }
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental){
    const schema = Joi.object().keys({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });

    return Joi.validate(rental, schema);
} 

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;
