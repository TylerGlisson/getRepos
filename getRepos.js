// Simple app to clone all repositories belonging to a github user

// node-fetch library
const fetch = require('node-fetch');

// Node file system api
const fs = require('fs');
// fs.mkdirSync('./repos');


// Node git-clone module
const clone = require('git-clone');

// Accept github username
let user = 'TylerGlisson';


const repos = fetch(`https://api.github.com/users/${user}/repos`)
    .then(response => response.json())
    // .then(resJson => console.log(resJson))
    .catch(err => {console.log('There was an error ', err)});

repos.then(resJson => console.log(resJson))


// Loop through response array and create a
//  new array of just repositories


// Map through new array and translate to clonable addres by adding ".git"
// eg     html_url: 'https://github.com/TylerGlisson/Wikipedia-Search',
//  to -> https://github.com/TylerGlisson/Wikipedia-Search.git


// Prompt user for preferred directory to clone repos into
let targetPath = './repos';

// Loop through new array and clone each item to preferred directory

// clone(https://github.com/TylerGlisson/Wikipedia-Search.git, targetPath)