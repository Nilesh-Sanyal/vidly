const promise1 = new Promise((resolve, reject) =>{
    setTimeout(() =>{
        console.log('First promise');
        resolve(1);
    },2000);
});

const promise2 = new Promise((resolve, reject) =>{
    setTimeout(() =>{
        console.log('Second promise');
        resolve(1);
    },2000);
});

const promise3 = new Promise((resolve, reject) =>{
    setTimeout(() =>{
        console.log('Third promise');
        //resolve(1);
        reject(1);
    },2000);
});

Promise.all([promise1,promise2,promise3])
.then((results) =>{
    console.log(results);
})
.catch((err) =>{
    console.log('Error occurred!!');
});