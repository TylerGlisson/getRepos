// Simple app to clone all repositories belonging to a github user

// node-fetch library
const fetch = require('node-fetch');

// Node file system api
const fs = require('fs');

// Node git-clone module
const clone = require('git-clone');

const fetcher = async (user) => {
    return fetch(`https://api.github.com/users/${user}/repos`)
        .then(data => data.json())
        .catch(err => {console.log('There was an error ', err)});
};

const cloneURL_arr = (data) => data.map((val => val.clone_url));

const names_arr = (data) => data.map((val => val.name));

let main = async () => {
    // Accept github username
    const user = 'TylerGlisson';

    // Fetch an object of a user's Github repositories 
    let response = await fetcher(user);
    

    // Loop through the response array and create an array of just the urls to clone each repository
    const urls = cloneURL_arr(response);

    // Loop through the response array and create an array of repository names to be used for creating directories
    const names = names_arr(response);

    // Prompt user for preferred directory to clone repos into
    const dirName = '/Users/t3/coding/getRepos/repos';

    // Loop through array of repository urls, mkdir for each associated reposotory name, then clone repo into new dir
    urls.map((url, index) => {
        let path = `${dirName}/${names[index]}`
       
        fs.mkdirSync(path);
        clone(url, path);
        // console.log(url);
    });
};

main();