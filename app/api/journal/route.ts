import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/MongodbClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

async function connectToDatabase() {
  const client = await clientPromise;
  return client.db("Next-app").collection("journal_entries");
}

// GET all journal entries for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const collection = await connectToDatabase();
    const entries = await collection
      .find({ email: session.user.email })
      .sort({ date: -1 })
      .toArray();
    return NextResponse.json(entries);
  } catch (error) {
    console.error("Failed to fetch journal entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch journal entries" },
      { status: 500 }
    );
  }
}

// POST a new journal entry
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = await request.json();
    const collection = await connectToDatabase();
    const result = await collection.insertOne({
      email: session.user.email,
      title,
      content,
      date: new Date(),
    });

    return NextResponse.json(
      { _id: result.insertedId, title, content, date: new Date() },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create journal entry:", error);
    return NextResponse.json(
      { error: "Failed to create journal entry" },
      { status: 500 }
    );
  }
}

// DELETE a journal entry by ID
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    const collection = await connectToDatabase();
    const result = await collection.deleteOne({
      _id: new Object(id),
      email: session.user.email,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Journal entry not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Journal entry deleted successfully" });
  } catch (error) {
    console.error("Failed to delete journal entry:", error);
    return NextResponse.json(
      { error: "Failed to delete journal entry" },
      { status: 500 }
    );
  }
}
