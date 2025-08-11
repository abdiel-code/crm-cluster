import mysql2 from 'mysql2';
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const MYSQL_USER = process.env.MYSQL_USER;

console.log("Password", MYSQL_PASSWORD);
console.log("Host", MYSQL_HOST);
console.log("Database", MYSQL_DATABASE);
console.log("User", MYSQL_USER);

const connection = mysql2.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
}).promise();

export default connection;


