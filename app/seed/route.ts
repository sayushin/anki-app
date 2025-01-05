import { db } from "@vercel/postgres";

interface SeedData {
  question: string;
  answer: string;
  checkbox: boolean;
}

const seedData: SeedData[] = [
  { question: "What is the capital of France?", answer: "Paris", checkbox: true },
  { question: "Is the sky blue?", answer: "Yes", checkbox: true },
  { question: "What is 2 + 2?", answer: "4", checkbox: false },
];

async function seedDatabase() {
  const client = await db.connect();

  try {
    console.log("Seeding data...");

    // Ensure the table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS flashcards (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        checkbox BOOLEAN
      );
    `);

    // Insert seed data
    for (const item of seedData) {
      const query = `
        INSERT INTO flashcards (question, answer, checkbox)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const values = [item.question, item.answer, item.checkbox];
      const result = await client.query(query, values);
      console.log("Inserted row:", result.rows[0]);
    }

    console.log("Seeding completed successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    client.release();
  }
}

// Run the seed function
seedDatabase();