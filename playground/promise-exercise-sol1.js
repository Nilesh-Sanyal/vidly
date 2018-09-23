
/* Solution using Promise based approach */

const customer = getCustomer(1);
customer.then((customerData =>{
    console.log('Customer Data: ', customerData);
    if(customerData.isGold){
        const movies = getTopMovies();
        movies.then((moviesList) =>{
            console.log('Top movies: ', moviesList);
            const emailAddress = sendEmail(customerData.email, moviesList);
            emailAddress.then((emailSendStatus) =>{
                console.log('Email sent..');
                
            });
        });
    }
}))

.catch((err) =>{
    console.log('Unknown error occurred, please try again later');
});


function getCustomer(id){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            resolve({id:1,name: 'Nilesh', isGold: true, email: 'test@gmail.com'});
        }, 4000);
    });
}

function getTopMovies(){
    return new Promise((resolve, reject) =>{
        resolve(['movie1', 'movie2']);
    });
}

function sendEmail(email, movies){
    return new Promise((resolve, reject) =>{
        resolve();
    });
}