/* Deleting sub documents created in mongo-relationship1.js */

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

async function removeCourse(courseId){

    const course = await Course.update({_id: courseId}, {
        $unset: {
            'author' : ''
        }
    });
}

removeCourse('5b9deb5e2e357e19b5b92bc8');