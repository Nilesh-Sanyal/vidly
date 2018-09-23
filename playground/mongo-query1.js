const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', function(err) {

    if(err)
        console.log('Error connecting to mongo db');
    else{
        console.log('Successfully connected to mongo db');
    }

});

//mongoose.connect('mongodb://localhost/mongo-exercises');

var courseSchema = new mongoose.Schema({
    tags: [String],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

var Course = mongoose.model('Course', courseSchema);

/* Callback approach */
/* Course.find({price: {$gte: 12, $lte: 15}}, function(err, results){
    if(err)
        console.log('Error getting courses');
    else
        console.log(JSON.stringify(results, undefined, 2));
}); */

/* Promise approach */
/* console.log('Showing all courses price b/w 12 to 15...');
Course.find({ price: {$gte: 12, $lte: 15}  }).then((result) =>{
    console.log(JSON.stringify(result, undefined, 2));
}); */


/* Async-await approach */
async function getCoursesBetweenPriceRanges(){
    const courses = await Course.find({price: {$gte: 12, $lte: 15}});
    console.log(JSON.stringify(courses, undefined, 2));
}
getCoursesBetweenPriceRanges();






