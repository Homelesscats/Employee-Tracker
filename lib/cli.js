const inquirer = require("inquirer");

// main class for user command line interface
class CLI {
  // the function run takes in the database connection
  async run(db) {
    // exitDatabase being false allows for the user to keep picking choices until they select 'Exit Database'
    let exitDatabase = false;

    console.log("WELCOME TO THE EMPLOYEE TRACKER");

    while (!exitDatabase) {
      // list of choices for the user
      console.log("-------------------------");
      const choice = await inquirer.prompt([
        {
          type: "list",
          name: "userchoice",
          message: "What would you like to do?",
          choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "View Employees by Manager",
            "Add a New Department",
            "Delete a Department",
            "Add a New Role",
            "Delete a Role",
            "Add a New Employee",
            "Delete an Employee",
            "Update Role of an Existing Employee",
            "Update Manager of an Existing Employee",
            "Exit Database",
          ],
        },
      ]);

      // switch case that takes the user choice and will run the respective function to show the user results of their choice
      switch (choice.userchoice) {
        case "View All Departments":
          await viewDepartments(db);
          break;

        case "View All Roles":
          await viewRoles(db);
          break;

        case "View All Employees":
          await viewEmployees(db);
          break;

        case "View Employees by Manager":
          await viewByManager(db);
          break;

        case "Add a New Department":
          await addDepartment(db);
          break;

        case "Delete a Department":
          await deleteDepartment(db);
          break;

        case "Add a New Role":
          await addRole(db);
          break;

        case "Delete a Role":
          await deleteRole(db);
          break;

        case "Add a New Employee":
          await addEmployee(db);
          break;

        case "Delete an Employee":
          await deleteEmployee(db);
          break;

        case "Update Role of an Existing Employee":
          await updateEmployeeRole(db);
          break;

        case "Update Manager of an Existing Employee":
          await updateEmployeeManager(db);
          break;

        case "Exit Database":
          exitDatabase = true;
          console.log("Exiting Database... Bye!");
          process.exit();
      }
    }
  }
}

// console logs a table of the departments
async function viewDepartments(db) {
  return new Promise((resolve, reject) => {
    const departmentSQL =
      "SELECT id as ID, department_name as Name FROM department";
    db.query(departmentSQL, (error, result) => {
      if (error) {
        console.error("Unable to retrieve departments: ");
        reject(error);
      } else {
        console.table(result);
        resolve(result);
        console.log("Returning to database options...");
      }
    });
  });
}

// console logs a table of the roles
async function viewRoles(db) {
  return new Promise((resolve, reject) => {
    const roleSQL =
      "SELECT role.id AS ID, role.title AS Title, department.department_name AS Department, role.salary as Salary FROM department JOIN role ON role.department_id = department.id";
    db.query(roleSQL, (error, result) => {
      if (error) {
        console.error("Unable to retrieve roles: ");
        reject(error);
      } else {
        console.table(result);
        resolve(result);
        console.log("Returning to database options...");
      }
    });
  });
}

// console logs a table of the employees
async function viewEmployees(db) {
  const employeeSQL =
    "SELECT employee.id AS ID, employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS Title, department.department_name AS Department, role.Salary AS Salary, employee.manager_id AS Manager FROM department JOIN role ON role.department_id = department.id JOIN employee on employee.role_id = role.id;";
  return new Promise((resolve, reject) => {
    db.query(employeeSQL, (error, result) => {
      if (error) {
        console.error("Unable to retrieve employees: ");
        reject(error);
      } else {
        console.table(result);
        resolve(result);
        console.log("Returning to database options...");
      }
    });
  });
}

module.exports = CLI;
