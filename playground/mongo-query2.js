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

Course.find({ price: { $in: [10,12] }  })

    .select('-_id -__v')
    .sort({name: 1})
    .then((result) =>{
        console.log(JSON.stringify(result, undefined, 2));
    });

