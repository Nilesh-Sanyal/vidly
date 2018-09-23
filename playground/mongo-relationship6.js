/* For adding array of sub-documents */
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
    authors: [authorSchema]
}));

async function createCourse(name, authors){
    const course = new Course({
        name, authors
    });
    const result = await course.save();
    console.log(result);
}


// for adding author for a specific course
async function addAuthor(courseId, author){
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
    
}

// for removing specific author for a specific course
async function removeAuthor(courseId, authorId){

    const course = await Course.findById(courseId);

    const author = course.authors.id(authorId);

    author.remove();

    course.save();

}

//removeAuthor('5b9e2c15c2cfcb1e2d355038','5b9e2c4df089841e3f28b01e');

//addAuthor('5b9e2c15c2cfcb1e2d355038', new Author({ name: 'Amy Drake'  }));


/* createCourse('Node JS',

    [
        new Author({name: 'Jhon Doe', bio: 'Sr. Web Developer', website: 'https://www.jhondoe.com' }),
        new Author({name: 'Smith Jhonson', bio: 'Jr. Web Developer', website: 'https://www.smithjhonson.com' }),
        new Author({name: 'Lee Andy', bio: 'Sr. Full Stack Developer', website: 'https://www.leeandy.com' })
        
    ]

); */
