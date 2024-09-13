import { NextResponse } from "next/server";
import clientPromise from "@/lib/MongodbClient";
import { getServerSession } from "next-auth"; // Import getServerSession
import { authOptions } from "@/lib/authOptions"; // Import your authOptions if required

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Ensure user is logged in
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
    const db = client.db("Next-app");

    // Insert the note into the "notes" collection with user's email
    const result = await db.collection("notes").insertOne({
      email: session.user.email,
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
