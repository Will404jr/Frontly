import { NextResponse } from "next/server";
import clientPromise from "@/lib/MongodbClient";

// Create a new todo
export async function POST(request: Request) {
  try {
    const { text, date } = await request.json();

    // Validate input
    if (!text || !date) {
      return NextResponse.json(
        { error: "Text and date are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("Next-app");

    // Insert the new todo
    const result = await db.collection("todos").insertOne({
      text,
      date,
      completed: false,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Todo saved successfully",
        todoId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to save todo:", error);
    return NextResponse.json({ error: "Failed to save todo" }, { status: 500 });
  }
}

// Get all todos for a specific date
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("Next-app");

    // Retrieve todos for the specified date
    const todos = await db.collection("todos").find({ date }).toArray();

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}
