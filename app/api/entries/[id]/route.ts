import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/MongodbClient2";
import Entry from "@/models/Entry";

// PUT (Update) an entry by ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase(); // Ensure database is connected
    const data = await request.json();

    const entry = await Entry.findByIdAndUpdate(
      params.id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json(entry, { status: 200 });
  } catch (error) {
    console.error("Database error (PUT):", error);
    return NextResponse.json(
      { error: "Failed to update entry. Please try again later." },
      { status: 500 }
    );
  }
}

// DELETE an entry by ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase(); // Ensure database is connected

    const entry = await Entry.findByIdAndDelete(params.id);
    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Entry deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error (DELETE):", error);
    return NextResponse.json(
      { error: "Failed to delete entry. Please try again later." },
      { status: 500 }
    );
  }
}
