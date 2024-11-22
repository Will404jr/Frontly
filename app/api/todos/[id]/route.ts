// [id]/route.ts

import { NextResponse } from "next/server";
import clientPromise from "@/lib/MongodbClient";
import { ObjectId } from "mongodb";

// Update the completed status or other properties of a todo
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { completed, text, priority, time } = await request.json();
    const { id } = params;

    // Construct update fields based on provided properties
    const updateFields: any = {};
    if (typeof completed === "boolean") updateFields.completed = completed;
    if (text) updateFields.text = text;
    if (priority) updateFields.priority = priority;
    if (time) updateFields.time = time;

    // Ensure at least one field to update
    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided for update" },
        { status: 400 }
      );
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("Next-app");

    // Update the todo
    const result = await db
      .collection("todos")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateFields });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Todo updated successfully" });
  } catch (error) {
    console.error("Failed to update todo:", error);
    return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
  }
}


// Delete a todo
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("Next-app");

    // Delete the todo
    const result = await db.collection("todos").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Failed to delete todo:", error);
    return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
  }
}
