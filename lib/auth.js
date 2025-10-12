// lib/auth.js
import bcrypt from "bcrypt";
import { query } from "./db.js";

export async function getUserCredentials(username) {
  const rows = await query("SELECT username, password_hash FROM users WHERE username = $1", [username]);
  if (rows.length === 0) return null;
 
  return { db_username: rows[0].username, db_hash: rows[0].password_hash };
}

export async function verifyPassword(plain, hash) {
  return await bcrypt.compare(plain, hash);
}
