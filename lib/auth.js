// lib/auth.js
import bcrypt from "bcrypt";
import { getConnection } from "./db.js";

export async function getUserCredentials(username) {
  let connection;
  try {
    connection = await getConnection();

    const result = await connection.execute(
      `SELECT username, password_hash 
       FROM test_users 
       WHERE username = :uname`,
      { uname: username }
    );
    console.log(username)
    console.log(result)
    if (result.rows.length > 0) {
      console.log('user found')
      const [db_username, db_hash] = result.rows[0];
      console.log(db_hash)
      return { db_username, db_hash };
    }
    return null;
  } catch (err) {
    console.error("DB error:", err);
    return null;
  } finally {
    if (connection) await connection.close();
  }
}

export async function verifyPassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
