// node-fetch library
const fetch = require('node-fetch');
const { terminal } = require('javascript-simple-terminal')

// Accept github username
let user = 'TylerGlisson';
let targetPath = '/Users/michaeldimmitt/new_c/serverless/tyler/repos';


// Loop through response array and create a
//  new array of just repositories
const cloneURL_arr = (data) => {
  const urlArr = data.map((val => val.clone_url));
  return urlArr;
};

const fetcher = async (user) => {
  let response =await fetch(`https://api.github.com/users/${user}/repos`)
  return response.json()
}

const cloneAllTheRepos = async (repos) => 
  repos.map(repo => { terminal('cd repos && git clone ' + repo + ' && cd ..;') })
  
const main = async () => {
  const data = await fetcher(user);
  const repos = cloneURL_arr(data);
  console.log(repos)
  terminal('pwd')
  cloneAllTheRepos(repos);
}
main()
