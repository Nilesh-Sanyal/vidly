const express = require('express');
const router = express.Router();

const { Rental,validateRental } = require('../models/rental');

const { Customer } = require('../models/customer');

const auth = require('../middleware/auth');

const { Movie } = require('../models/movie');

router.get('/', async(req, res) =>{
    const rentals = await Rental.find({});
    res.send({rentals: rentals});
});

router.get('/:id', async(req, res) =>{

    const rentalId = req.params.id;

    const rental = await Rental.findById(rentalId);

    if(!rental)
        return res.status(404).send('No rental found for this id');
    res.send(rental);

});

router.post('/', auth, async(req, res) =>{

    const { error } = validateRental(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);

    if(!customer)
        return res.status(404).send('No customer found with this id');
    
    const movie =  await Movie.findById(req.body.movieId);  
    
    if(!movie)
        return res.status(404).send('No movie found with this id');

    if (movie.numberInStock === 0) 
        return res.status(400).send('Movie not in stock.');

    let rental = new Rental({
        customer: {
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },

        movie: {
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    rental = await rental.save();
    movie.numberInStock--;
    movie.save();
    res.send(rental);

});

module.exports = router;