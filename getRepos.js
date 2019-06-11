// Simple app to clone all repositories belonging to a github user

// node-fetch library
const fetch = require('node-fetch');

// Accept github username
let user = 'TylerGlisson';


const repos = fetch(`https://api.github.com/users/${user}/repos`)
    .then(response => response.json())
    // .then(resJson => console.log(resJson))
    .catch(err => {console.log('There was an error ', err)});

repos.then(resJson => console.log(resJson))

// Loop through response array and create a
//  new array of just repositories


// Map through new array and translate  
