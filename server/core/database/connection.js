import mysql2 from 'mysql2';
import envData from "../../core/config/envData.js";

const MYSQL_PASSWORD = envData.db.password;
const MYSQL_HOST = envData.db.host;
const MYSQL_DATABASE = envData.db.database;
const MYSQL_USER = envData.db.user;

const connection = mysql2.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
}).promise();

export default connection;


