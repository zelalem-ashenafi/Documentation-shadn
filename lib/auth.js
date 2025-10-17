import bcrypt from "bcrypt";
import { query } from "./db.js";

export async function getUserCredentials(username) {
  try {
    // Destructure rows properly
    const { rows } = await query(
      "SELECT username, password_hash FROM users WHERE username = $1",
      [username]
    );

    // Handle case: user not found
    if (!rows || rows.length === 0) {
      console.warn("No user found for:", username);
      return null;
    }

    // Return clean object
    const user = rows[0];
    return { db_username: user.username, db_hash: user.password_hash };

  } catch (err) {
    console.error("Error fetching user credentials:", err);
    throw new Error("Database query failed");
  }
}

export async function verifyPassword(plain, hash) {
  try {
    return await bcrypt.compare(plain, hash);
  } catch (err) {
    console.error("Error verifying password:", err);
    return false;
  }
}
