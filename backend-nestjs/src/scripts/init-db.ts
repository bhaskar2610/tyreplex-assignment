import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });

async function init() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`,
  );
  console.log(`Database '${process.env.DB_NAME}' is ready.`);
  await connection.end();
}

init().catch((err) => {
  console.error('Failed to create database:', err);
  process.exit(1);
});
