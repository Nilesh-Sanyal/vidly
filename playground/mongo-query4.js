const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises');

var courseSchema = new mongoose.Schema({
    tags: [String],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

var Course = mongoose.model('Course', courseSchema);

/* (Query first approach) */
async function updateCourse1(id){
    const course1 = await Course.findById(id);
    if(!course1)
        return;
    course1.set({
        isPublished: true,
        author: 'Another Author'
    });
}

updateCourse1('5a68fdd7bee8ea64649c2777');


/* (update first approach) */
async function updateCourse2(id){
    const course2 = await Course.update({_id: id}, {
        $set: {
            author: "Nilesh",
            isPublished: false
        }
    });
    console.log(course2);
}

updateCourse2('5a68fde3f09ad7646ddec17e');
