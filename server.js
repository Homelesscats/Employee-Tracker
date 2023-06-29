const express = require('express');
const mysql = require('mysql2'); 
const inquirer = require('inquirer');
const PORT = process.env.PORT || 3001;
const app = express();



// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'CEDRIC',
    // MySQL password
    password: '',
    database: 'employee_tracker_db'
  },
  console.log(`Connected to the books_db database.`)
);



/* 
var inquirer = require('inquirer');
inquirer
  .prompt([
    /* Pass your questions in here */
  //   ])
  //  .then((answers) => {
    // Use user feedback for... whatever!!
  //  })
  //  .catch((error) => {
    //  if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    // } else {
      // Something else went wrong
    // }
 // });
  */