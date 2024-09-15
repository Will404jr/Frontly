import { NextResponse } from "next/server";
import clientPromise from "@/lib/MongodbClient";
import { getServerSession } from "next-auth"; // Import getServerSession
import { authOptions } from "@/lib/authOptions"; // Import your authOptions

// Create a new todo
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Ensure user is logged in
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    // Insert the new todo into the "todos" collection with user's email
    const result = await db.collection("todos").insertOne({
      email: session.user.email,
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Date is required" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("Next-app");
    const todos = await db.collection("todos").find({ date }).toArray();

    return NextResponse.json({ todos }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}
