import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const main_tab = decodeURIComponent(searchParams.get("main_tab") || "");
    const sub_section = decodeURIComponent(searchParams.get("sub_section") || "");
    const page_name = decodeURIComponent(searchParams.get("page_name") || "");

    console.log("Incoming params:", { main_tab, sub_section, page_name });

    if (!main_tab || !page_name) {
      return NextResponse.json({ error: "Missing required params" }, { status: 400 });
    }

    // SQL with optional sub_section filtering
    let sql = `
      SELECT 
        s.section_id,
        s.section_title,
        s.section_description,
        s.sql_query,
        s.table_columns
      FROM sections s
      JOIN layout l ON s.layout_id = l.layout_id
      WHERE l.main_tab = $1
        AND l.page_name = $2
        ${sub_section ? "AND l.sub_section = $3" : ""}
      ORDER BY s.section_id;
    `;

    // Parameters array
    const params = sub_section ? [main_tab, page_name, sub_section] : [main_tab, page_name];

    // Await query result and extract rows
    // console.log("Executing SQL:", sql, "with params:", params);
    const result = await query(sql, params);
    const rows = result.rows;

    if (!Array.isArray(rows)) {
      return NextResponse.json({ error: "Unexpected query result format" }, { status: 500 });
    }

    if (rows.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Parse JSON columns safely
    const formattedRows = rows.map((row) => ({
      section_id: row.section_id,
      section_title: row.section_title,
      description: row.section_description,
      sqlquery: row.sql_query,
      columns: typeof row.table_columns === "string" ? JSON.parse(row.table_columns) : row.table_columns || [],
    }));

    return NextResponse.json(formattedRows, { status: 200 });
  } catch (err) {
    console.error("DB Error in /api/content:", err);
    return NextResponse.json({ error: "Internal Server Error", details: err.message }, { status: 500 });
  }
}
