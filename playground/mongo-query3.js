const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', function(err) {

    if(err)
        console.log('Error connecting to mongo db');
    else{
        console.log('Successfully connected to mongo db');
    }

});

var courseSchema = new mongoose.Schema({
    tags: [String],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

var Course = mongoose.model('Course', courseSchema);

Course.find({})
    .select('-_id -__v -price -date -tags -isPublished')
    .sort({name: -1})
    .or([
        { name: 'React Course' },
        { name: 'Express.js Course' }
    ])
    .then((results) =>{
        console.log(JSON.stringify(results, undefined, 2));
    });

