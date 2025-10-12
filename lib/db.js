// lib/db.js
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DB,
});

export async function query(text, params) {
  const res = await pool.query(text, params);
  return res.rows;
}
