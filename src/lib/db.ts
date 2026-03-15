import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',     // ឬ IP របស់ Server អ្នក
  user: 'root',          // ឈ្មោះ User MySQL
  password: '',          // Password MySQL
  database: 'zway_db',   // ឈ្មោះ Database របស់អ្នក
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});