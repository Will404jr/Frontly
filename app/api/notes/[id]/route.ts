import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/MongodbClient";
import { ObjectId } from "mongodb";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Validate the ID
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid note ID" }, { status: 400 });
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("Next-app"); // Replace with your actual database name

    // Delete the note
    const result = await db
      .collection("notes")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete note:", error);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { title, description } = await request.json();

    // Validate the ID
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid note ID" }, { status: 400 });
    }

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

    // Update the note
    const result = await db.collection("notes").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          description,
          updatedAt: new Date(), // Optional: track when the note was updated
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Note updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update note:", error);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
}
