//requiring all my classes

const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const fs = require("fs");

// all the questions being asked
const questions = [
  {
    type: "input",
    name: "name",
    message: "What is the manager's name?"
  },
  {
    type: "input",
    message: "What the manager's employee id?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the manger's email?",
    name: "email", 
  },
  {
    type: "input",
    message: "What is the manger's office number?",
    name: "officeNumber", 
  }
];

inquirer
  .prompt(questions)
  .then(function(user) {
    
    //first the manager card
    const manager = new Manager (user.name , user.id , user.email , user.officeNumber);
    
    const templateManagerFile = fs.readFileSync('./templates/manager.html',  { encoding: 'utf8' });
    let temporaryFile = templateManagerFile.replace('{{ name }}', manager.name);
    temporaryFile = temporaryFile.replace('{{ role }}', manager.getRole());
    temporaryFile = temporaryFile.replace('{{ id }}',manager.id);
    temporaryFile = temporaryFile.replace('{{ email }}',manager.email);
    temporaryFile = temporaryFile.replace('{{ officeNumber }}',manager.officeNumber);
    console.log(temporaryFile);
    
  })
  .catch(err=>console.log(err));

// function readAndRenderHTML (position) {​
//   const templateFile = fs.readFileSync(`./templates/${position}.html`,  { encoding: 'utf8' });
// ​
//   let temporaryFile = templateFile.replace('{{ name }}', 'Bob');
// ​
//   temporaryFile = temporaryFile.replace('{{ email }}', 'Bob@subgenius.org')
//   }
