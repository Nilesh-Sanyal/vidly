const express = require('express');

const router = express.Router();

const {Genre, validateGenre} = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', async(req,res) =>{
    const genres = await Genre.find({});
    res.status(200).send(genres);
});

router.get('/:id', async(req, res) =>{
    const genreId = req.params.id;
    
    const genre = await Genre.findById(genreId);

    if(!genre)
        res.status(404).send('Genre not found for that specific ID');

    res.send({genre: genre});

});

router.post('/', auth, async(req, res) =>{
    const { error } = validateGenre(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
    }
    else{  
        let genre = new Genre({
            name: req.body.name
        });
        genre = await genre.save();
        res.send(genre);
    }
});

router.put('/:id', auth, async(req, res) =>{
    const genreId = req.params.id;
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    else{
        // findByIdAndUpdate(id, update, options);
        const genre = await Genre.findByIdAndUpdate(genreId, {name: req.body.name},{
            new: true
        });
        res.status(201).send({genre: genre});
    }
});

router.delete('/:id', [auth,admin], async(req, res) =>{

    // findByIdAndRemove(id, options)

    const genreId = req.params.id;

    const genre = await Genre.findByIdAndRemove(genreId, {
        select: '_id name'
    });

    if(!genre)
        res.status(404).send('Genre not found for that specific ID');

    else
        res.send({genre: genre});    

});



module.exports = router;