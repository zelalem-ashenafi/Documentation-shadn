// lib/db.js
import oracledb from "oracledb";

export async function getConnection() {
  return await oracledb.getConnection({
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASS,
    connectionString: process.env.ORACLE_DSN,
  });
}
