
/* callback approach */

/* console.log('Before async');

getResult(1,'Nilesh', function(user){
    console.log(user);
});

console.log('After async');

function getResult(userId,userName, callback){
    setTimeout(() =>{
        callback({ uid: userId, name: userName });
    }, 2000);
} */


/* promise approach */

console.log('Before async');

const p = getResult(1, 'Nilesh');

p.then(user =>{
    console.log(user);
})

.catch(err =>{
    console.log('Error occurred!!');
});

console.log('After async');


 function getResult(userId, userName){

     return new Promise((resolve, reject) =>{

        resolve({uid: userId, name: userName});
        
        //reject(1);

     });
 }



