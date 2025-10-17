import { NextResponse } from "next/server"
import { query } from "@/lib/db"

// GET /api/layout
export async function GET() {
  try {
    const result = await query(`
      SELECT layout_id, main_tab, sub_section, page_name
      FROM layout
      ORDER BY main_tab, sub_section, page_name
    `)

    // PostgreSQL client returns { rows: [...] }
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("Error fetching layout:", error)
    return NextResponse.json(
      { error: "Failed to fetch layout data" },
      { status: 500 }
    )
  }
}
