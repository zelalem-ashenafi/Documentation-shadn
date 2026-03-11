import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const bi = searchParams.get("bi");

    if (!bi) {
      return NextResponse.json(
        { error: "Catalog type (bi) required" },
        { status: 400 }
      );
    }

    const rows = await query(
      `SELECT id, report_name, main_folder, sub_folder, report_link
       FROM catalogs
       WHERE bi = $1
       ORDER BY report_name`,
      [bi]
    );
    
    return NextResponse.json(rows, { status: 200 });

  } catch (error) {
    console.error("Catalog fetch error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}