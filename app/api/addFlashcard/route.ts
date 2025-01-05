import { NextResponse } from 'next/server';
import { db } from "@vercel/postgres";

export async function POST(request: Request) {
  const { question, answer } = await request.json();

  // Basic validation
  if (!question || !answer) {
    return NextResponse.json(
      { message: 'Question and answer are required.' },
      { status: 400 }
    );
  }

  const client = await db.connect();

  try {
    const query = `
      INSERT INTO flashcards (question, answer, checkbox)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [question, answer, false]; // Assuming checkbox is false by default
    const result = await client.query(query, values);

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting flashcard:", error);
    return NextResponse.json({ error: "Error inserting flashcard" }, { status: 500 });
  } finally {
    client.release();
  }
}