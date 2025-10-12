import { NextResponse } from "next/server";
import { getAllContent } from "@/lib/content";

export async function GET() {
  try {
    const allContent = await getAllContent();
    console.log("Fetched all content:", allContent);
    return NextResponse.json(allContent);
  } catch (err) {
    console.error("Error fetching content:", err);
    return NextResponse.json(
      { error: "Failed to load content" },
      { status: 500 }
    );
  }
}
