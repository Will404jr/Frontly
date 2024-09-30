import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/MongodbClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { ObjectId } from "mongodb";

async function connectToDatabase() {
  const client = await clientPromise;
  return client.db("Next-app").collection("stickies");
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if session or session.user is undefined
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const collection = await connectToDatabase();
    const notes = await collection
      .find({ email: session.user.email })
      .toArray();
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if session or session.user is undefined
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content, color, tags } = await request.json();
    const collection = await connectToDatabase();
    const result = await collection.insertOne({
      email: session.user.email,
      content,
      color,
      tags,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { id: result.insertedId, content, color, tags },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if session or session.user is undefined
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, content, tags } = await request.json();
    const collection = await connectToDatabase();

    // Fetch the existing note from the database
    const existingNote = await collection.findOne({
      _id: new ObjectId(id),
      email: session.user.email,
    });

    if (!existingNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    // Use existing tags if new tags are not provided
    const updatedTags = tags !== undefined ? tags : existingNote.tags;

    // Update the note content and tags
    const result = await collection.updateOne(
      { _id: new ObjectId(id), email: session.user.email },
      { $set: { content, tags: updatedTags, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Note updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if session or session.user is undefined
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    const collection = await connectToDatabase();
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      email: session.user.email,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Note deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}
