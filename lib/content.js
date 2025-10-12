// lib/content.js
import { query } from "./db.js";

export async function getContentByDepartment(dept) {
  const result = await query(
    "SELECT content FROM contents WHERE department = $1",
    [dept]
  );
  return result.rows[0]?.content || null;
}

// lib/content.js

export async function getAllContent() {
  const result = await query("SELECT department, content FROM contents");

  const allData = {};
  result.forEach((row) => {
    allData[row.department] =
      typeof row.content === "string"
        ? JSON.parse(row.content)
        : row.content;
  });

  return allData;
}

