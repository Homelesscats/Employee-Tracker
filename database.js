import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const poll = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE

}).promise() 





//https://www.youtube.com/watch?v=Hej48pi_lOc&t=589s @ 10:08 for DOT ENV install//