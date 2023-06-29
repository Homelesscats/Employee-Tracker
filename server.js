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

///////////////////////////////////////////////////////////
 
// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test'
});

// simple query  --------------------------------------------------------------EXAMPLE 
connection.query(
  'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);

// with placeholder
connection.query(
  'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
  ['Page', 45],
  function(err, results) {
    console.log(results);
  }
);