import { NextResponse } from "next/server";
import clientPromise from "@/lib/MongodbClient";

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();

    // Validate input
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("Next-app"); // Replace with your actual database name

    // Insert the note
    const result = await db.collection("notes").insertOne({
      title,
      description,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Note saved successfully", noteId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to save note:", error);
    return NextResponse.json({ error: "Failed to save note" }, { status: 500 });
  }
}
