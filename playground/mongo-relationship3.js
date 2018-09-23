/* Example on retrieving data for course detail alongwith author detail
for relationships in reference approach */

/* Do not try to use this approach after executing mongo-relationship2.js, 

   otherwise it will throw 
   
   an exception '(node:6617) UnhandledPromiseRejectionWarning: CastError: Cast to ObjectId failed for value "Nilesh" at path "_id" for model "Author" '

*/

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() =>{
        console.log('Successfully connected to mongo db');
    })
    .catch((err) =>{
        console.log('Error connecting to mongo db');
    });

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));    

async function listCourses(){

    const courses = await Course
        .find()
        .populate('author', 'name bio')
        .select('name author');

    console.log(courses);

}

listCourses();

