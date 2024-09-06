import { NextResponse } from "next/server";
import clientPromise from "@/lib/MongodbClient";
import { ObjectId } from "mongodb";

// Update the completed status of a todo
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { completed } = await request.json();
    const { id } = params;

    // Validate input
    if (typeof completed !== "boolean") {
      return NextResponse.json(
        { error: "Completed status must be a boolean" },
        { status: 400 }
      );
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("Next-app");

    // Update the todo's completed status
    const result = await db
      .collection("todos")
      .updateOne({ _id: new ObjectId(id) }, { $set: { completed } });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Todo updated successfully" });
  } catch (error) {
    console.error("Failed to update todo:", error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}
