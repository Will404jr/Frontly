import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/MongodbClient";

export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    const client = await clientPromise;
    const db = client.db("Next-app"); // Replace with your actual database name

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch notes
    const notes = await db
      .collection("notes")
      .find({})
      .sort({ createdAt: -1 }) // Sort by creation date, newest first
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total count of notes
    const totalNotes = await db.collection("notes").countDocuments();

    return NextResponse.json({
      notes,
      currentPage: page,
      totalPages: Math.ceil(totalNotes / limit),
      totalNotes,
    });
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}
