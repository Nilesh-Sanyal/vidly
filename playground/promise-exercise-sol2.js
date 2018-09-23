/* Async-await based approach */

async function notifyCustomer(){

    try{
        const customerData = await getCustomer(1);
        console.log('Customer Data: ', customerData);
        if(customerData.isGold){
            const movieList = await getTopMovies();
            console.log('Top movies: ', movieList);
            await sendEmail(customerData.email, movieList);
            console.log('Email sent...');
        }
    }

    catch(ex){
        console.log('Unknown error occurred, please try again later');
    }
}

notifyCustomer();

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
        //reject(1);
    });
}