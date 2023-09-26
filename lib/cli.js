const inquirer = require("inquirer");

// main class for user command line interface
class CLI {
  // the function run takes in the database connection
  async run(db) {
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

// add a new department
async function addDepartment(db) {
  const choice = await inquirer.prompt([
    {
      type: "input",
      name: "departmentInput",
      message: "What is the name of the department to be added?",
      validate: checkInput,
    },
  ]);

  const departmentSQL = "INSERT INTO department (department_name) VALUES (?)";
  return new Promise((resolve, reject) => {
    db.query(departmentSQL, [choice.departmentInput], (error, result) => {
      if (error) {
        console.error("Unable to add department: ");
        reject(error);
      } else {
        resolve(result);
        console.log("-------------------------");
        console.log("Department successfully added!");
        console.log("Returning to database options...");
      }
    });
  });
}

// add a new role
async function addRole(db) {
  // obtain a list of the departments to use as a list for the user to choose from
  const departmentsList = await departmentList(db);

  // asks user to input own role name/salary, departmentsList as a choice list
  const choice = await inquirer.prompt([
    {
      type: "input",
      name: "roleName",
      message: "What is the name of the role to be added?",
      validate: checkInput,
    },
    {
      type: "input",
      name: "roleSalary",
      message: "What is the salary of the role?",
      validate: checkInt,
    },
    {
      type: "list",
      name: "roleDepartment",
      message: "What department is the role in?",
      choices: departmentsList.map((department) => ({
        name: department.department_name,
        value: department.id,
      })),
    },
  ]);

  const roleSQL =
    "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.query(
      roleSQL,
      [choice.roleName, choice.roleSalary, choice.roleDepartment],
      (error, result) => {
        if (error) {
          console.error("Unable to add role: ");
          reject(error);
        } else {
          resolve(result);
          console.log("-------------------------");
          console.log("Role successfully added!");
          console.log("Returning to database options...");
        }
      }
    );
  });
}

module.exports = CLI;
