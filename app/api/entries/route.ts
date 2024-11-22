import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/MongodbClient2";
import Entry from "@/models/Entry";

// Force dynamic rendering for this route
export const dynamic = "force-dynamic";

// GET all entries
export async function GET() {
  try {
    await connectToDatabase(); // Ensure database is connected
    const entries = await Entry.find({}).sort({ createdAt: -1 }); // Use Mongoose model
    return NextResponse.json(entries, { status: 200 });
  } catch (error) {
    console.error("Database error (GET):", error);
    return NextResponse.json(
      { error: "Failed to fetch entries. Please try again later." },
      { status: 500 }
    );
  }
}

// POST a new entry
export async function POST(request: Request) {
  try {
    await connectToDatabase(); // Ensure database is connected
    const data = await request.json();

    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const entry = new Entry({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await entry.save();

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error("Database error (POST):", error);
    return NextResponse.json(
      { error: "Failed to create entry. Please try again later." },
      { status: 500 }
    );
  }
}
