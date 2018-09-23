/* Example on creating relationships using embedded document approach */

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() =>{
        console.log('Successfully connected to mongo db');
    })
    .catch((err) =>{
        console.log('Error connecting to mongo db');
    });

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: authorSchema
}));

async function createAuthor(name, bio, website){
    const author = new Author({
        name,
        bio,
        website
    });

    const result = await author.save();

    console.log(result);

}

async function createCourse(name, author){

    const course = new Course({
        name,
        author: author
    });

    const result = await course.save();

    console.log(result);

}

// createAuthor('Nilesh', 'Node JS Developer', 'https://www.coinjolt.com');

// createCourse('Node JS', new Author({ name: 'Nilesh', bio: 'Node JS Developer', website: 'https://www.coinjolt.com' }));

