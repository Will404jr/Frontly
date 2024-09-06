import { NextResponse } from "next/server";
import clientPromise from "@/lib/MongodbClient";
import { ObjectId } from "mongodb";

// Create a new transaction
export async function POST(request: Request) {
  try {
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
    const db = client.db("Next-app"); // Replace with your actual database name

    // Insert the transaction
    const result = await db.collection("transactions").insertOne({
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

// Get all transactions
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Next-app");

    // Retrieve all transactions
    const transactions = await db.collection("transactions").find().toArray();

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
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Transaction not found" },
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
