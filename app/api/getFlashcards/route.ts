import { NextRequest, NextResponse } from "next/server";
import { db } from "@vercel/postgres";

export async function GET(req: Request) {
  const client = await db.connect();

  try {
    console.log("Fetching flashcards from the database...");
    const result = await client.query('SELECT * FROM flashcards');
    console.log("Flashcards fetched successfully:", result.rows);
    if (result && result.rows.length > 0) {
      return NextResponse.json(result.rows, { status: 200 });
    } else {
      return NextResponse.json({ error: "No flashcards found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    return NextResponse.json({ error: "Error fetching flashcards" }, { status: 500 });
  } finally {
    client.release();
  }
}
