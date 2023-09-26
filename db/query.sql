SELECT 
    role.id AS ID, 
    role.title AS Title, 
    department.department_name AS Department, 
    role.salary AS Salary
FROM 
    department
JOIN
    role ON role.department_id = department.id;



    SELECT 
    role.id AS ID, 
    role.title AS Title, 
    department.department_name AS Department, 
    role.salary AS Salary
FROM 
    department
JOIN
    role ON role.department_id = department.id;