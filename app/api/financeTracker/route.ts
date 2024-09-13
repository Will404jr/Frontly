import { NextResponse } from "next/server";
import clientPromise from "@/lib/MongodbClient";
import { getServerSession } from "next-auth"; // Import getServerSession
import { authOptions } from "@/lib/authOptions"; // Import your authOptions
import { ObjectId } from "mongodb";

// Create a new transaction
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Ensure user is logged in
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, amount, category, date } = await request.json();

    // Validate input
    if (!type || !amount || !category || !date) {
      return NextResponse.json(
        { error: "All fields (type, amount, category, date) are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("Next-app");

    // Insert the transaction into the "transactions" collection with user's email
    const result = await db.collection("transactions").insertOne({
      email: session.user.email,
      type,
      amount: parseFloat(amount),
      category,
      date,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Transaction saved successfully",
        transactionId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to save transaction:", error);
    return NextResponse.json(
      { error: "Failed to save transaction" },
      { status: 500 }
    );
  }
}

// Get all transactions for the logged-in user
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Ensure user is logged in
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("Next-app");

    // Retrieve all transactions for the logged-in user
    const transactions = await db
      .collection("transactions")
      .find({ email: session.user.email })
      .toArray();

    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

// Delete a transaction
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Ensure user is logged in
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("Next-app");

    // Delete the transaction
    const result = await db
      .collection("transactions")
      .deleteOne({ _id: new ObjectId(id), email: session.user.email });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Transaction not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Transaction deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete transaction:", error);
    return NextResponse.json(
      { error: "Failed to delete transaction" },
      { status: 500 }
    );
  }
}
