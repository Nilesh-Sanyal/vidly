
/* Example on creating relationships using references approach */

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
        author
    });

    const result = await course.save();

    console.log(result);

}



//createAuthor('Nilesh Sanyal', 'Node JS Developer', 'https://github.com/NileshSanyal');

//createCourse('Node JS', '5b9de02cda188d176ec8948e');


