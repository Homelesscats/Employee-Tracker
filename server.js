const mysql = require("mysql2");
const CLI = require("./lib/cli");

const PORT = process.env.PORT || 3003;

// Connect to database
const db = mysql.createConnection({
  host: "localhost",

  user: "CEDRIC",

  password: "",
  database: "employee_db",
});

db.connect((error) => {
  // if error in connection, gives the user back the error
  if (error) {
    console.error("Error connecting to the database: ", error);
    return;
  } else {
    // if connection was successful, run the command line interface for user input
    console.log(`Now connected to the employee database through PORT ${PORT}!`);
    new CLI().run(db);
  }
});
