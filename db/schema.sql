DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (

id INT NOT NULL PRIMARY KEY,
dept_name VARCHAR(30) NOT NULL; /*to hold department name */

CREATE TABLE role (

id INT PRIMARY KEY,
title VARCHAR(30) /*--------to hold role title */
salary DECIMAL /*-----------to hold role salary */ 
department_id INT /*--------to hold reference to */

)

CREATE TABLE employee (

id INT PRIMARY KEY,
first_name VARCHAR(30)/*to hold employee first name*/
last_name VARCHAR(30)/*to hold employee last name*/
role_id INT /*to hold reference to employee role*/
manager_id INT /*to hold reference to another employee that is the manager of the current employee (null if the employee has no manager*/
)