//requiring all my classes

const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const fs = require("fs");

// all the questions being asked
const initialQuestions = [
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
  },
  {
    type: "checkbox",
    message: "What type of team member would you like to add?",
    name: "member", 
    choices: ["engineer","intern","done"]
  }
];

const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the employee's name?"
  },
  {
    type: "input",
    message: "What is the employee id?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the employee's email?",
    name: "email", 
  },
  {
    type: "input",
    message: "What is the employee's github username?",
    name: "github", 
  }
];

const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the employee's name?"
  },
  {
    type: "input",
    message: "What is the employee id?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the employee's email?",
    name: "email", 
  },
  {
    type: "input",
    message: "What school is the employee going to?",
    name: "school", 
  }
];

inquirer
  .prompt(initialQuestions)
  .then(function(user) {
    
    const templateMainFile = fs.readFileSync(`./templates/main.html`,  { encoding: 'utf8' });

    //first the manager card
    const manager = new Manager (user.name , user.id , user.email , user.officeNumber);
    
    let team = renderHTML(manager);



    //adding team members
    switch(user.member[0]){
      case "engineer":
      inquirer.prompt(engineerQuestions)
      .then(function(data){
        let engineer1 = new Engineer(data.name , data.id, data.email,data.github);
        let engineer1card = renderHTML(engineer1);
        team = team + engineer1card
        console.log(team);
        let temporaryMainFile = templateMainFile.replace('{{ team }}', team);
        fs.writeFileSync("index.html",temporaryMainFile);
      }).catch(err=>console.log(err));
      case "intern":
      inquirer.prompt(internQuestions)
      .then(function(data){
        let intern1 = new Intern(data.name , data.id, data.email,data.school);
        let intern1Card = renderHTML(intern1);
        team = team + intern1Card
        console.log(team);
        let temporaryMainFile = templateMainFile.replace('{{ team }}', team);
        fs.writeFileSync("index.html",temporaryMainFile);
      }).catch(err=>console.log(err));
    }
  })
  .catch(err=>console.log(err));


function renderHTML (position){
    const templateFile = fs.readFileSync(`./templates/${position.getRole().toLowerCase()}.html`,  { encoding: 'utf8' });
    let temporaryFile = templateFile.replace('{{ name }}', position.name);
    temporaryFile = temporaryFile.replace('{{ role }}', position.getRole());
    temporaryFile = temporaryFile.replace('{{ id }}', position.id);
    temporaryFile = temporaryFile.replace('{{ email }}', position.email);
    temporaryFile = temporaryFile.replace('{{ email }}', position.email);


    if(position.getRole().toLowerCase()==="engineer"){
        temporaryFile = temporaryFile.replace('{{ github }}', position.github);
        temporaryFile = temporaryFile.replace('{{ github }}', position.github);
      }else if(position.getRole().toLowerCase()==="intern"){
        temporaryFile = temporaryFile.replace('{{ school }}', position.school);
      }else if(position.getRole().toLowerCase()==="manager"){
        temporaryFile = temporaryFile.replace('{{ officeNumber }}', position.officeNumber);
    }

    return temporaryFile;
}


  
