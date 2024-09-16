import { NextResponse } from "next/server";
import clientPromise from "@/lib/MongodbClient";
import { getServerSession } from "next-auth"; // Import getServerSession
import { authOptions } from "@/lib/authOptions"; // Import your authOptions

// Create a new sticky note
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Ensure user is logged in
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content, color, tags } = await request.json();

    // Validate input
    if (!content || !color) {
      return NextResponse.json(
        { error: "Content and color are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("Next-app");

    // Insert the new sticky note into the "sticky_notes" collection with user's email
    const result = await db.collection("sticky_notes").insertOne({
      email: session.user.email,
      content,
      color,
      tags: tags || [],
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Sticky note saved successfully",
        noteId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to save sticky note:", error);
    return NextResponse.json(
      { error: "Failed to save sticky note" },
      { status: 500 }
    );
  }
}

// Fetch sticky notes for the logged-in user
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Ensure user is logged in
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("Next-app");

    // Fetch sticky notes for the logged-in user
    const notes = await db
      .collection("sticky_notes")
      .find({ email: session.user.email })
      .toArray();

    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch sticky notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch sticky notes" },
      { status: 500 }
    );
  }
}
