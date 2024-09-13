import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/MongodbClient";
import { getServerSession } from "next-auth"; // Import getServerSession
import { authOptions } from "@/lib/authOptions"; // Import your authOptions if required

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Ensure user is logged in
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("Next-app"); // Replace with your actual database name

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch notes for the logged-in user
    const notes = await db
      .collection("notes")
      .find({ email: session.user.email }) // Filter by user's email
      .sort({ createdAt: -1 }) // Sort by creation date, newest first
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total count of notes for the user
    const totalNotes = await db
      .collection("notes")
      .countDocuments({ email: session.user.email });

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
