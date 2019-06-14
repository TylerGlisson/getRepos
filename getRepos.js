// Simple app to clone all repositories belonging to a github user

const fetch = require('node-fetch');
const fs = require('fs');
const clone = require('git-clone');
const prompts = require('prompts');

const prompter = async () => {
    const response = await prompts([
        {
        type: 'text',
        name: 'username',
        message: 'Please enter a Github username:',
        },
        {
        type: 'text',
        name: 'dir',
        message: 'Please enter a local absolute path to clone the repositories into:'
        }
    ]);
    return response;
};

const fetcher = async (user) => {
    return fetch(`https://api.github.com/users/${user}/repos`)
        .then(data => data.json())
        .catch(err => {console.log('There was an error ', err)});
};

const cloneURL_arr = (data) => data.map((val => val.clone_url));
const names_arr = (data) => data.map((val => val.name));

const main = async () => {
    let userObj = await prompter();
    let response = await fetcher(userObj.username);
    

    // Loop through the response array and create an array of just the urls to clone each repository
    const urls = cloneURL_arr(response);

    // Loop through the response array and create an array of repository names to be used for creating directories
    const names = names_arr(response);


    // Loop through array of repository urls, mkdir for each associated reposotory name, then clone repo into new dir
    urls.map((url, index) => {
        let path = `${userObj.dir}/${names[index]}`
       
        fs.mkdirSync(path);
        clone(url, path);
    });
    
};

main();