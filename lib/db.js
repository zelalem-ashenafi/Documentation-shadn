import pkg from 'pg'
const { Pool } = pkg

export const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_NAME,
  password: process.env.PG_PASS,
  port: process.env.PG_PORT,
})

export async function query(text, params) {
  const res = await pool.query(text, params)
  // console.log("DB PASSWORD TYPE:", typeof process.env.DB_PASSWORD)
  // console.log("DB PASSWORD VALUE:", process.env.DB_PASSWORD ? "Loaded" : "Missing")
  return res
}
