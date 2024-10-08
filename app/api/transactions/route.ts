import { NextResponse } from "next/server";
import clientPromise from "@/lib/MongodbClient";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("financeTracker");
    const transactions = await db
      .collection("transactions")
      .find({})
      .sort({ date: -1 })
      .toArray();
    return NextResponse.json(transactions);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

// Fix the type of the request parameter
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("financeTracker");
    const body = await request.json(); // Parse the JSON body from the request
    const transaction = await db.collection("transactions").insertOne(body);
    return NextResponse.json(transaction);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to add transaction" },
      { status: 500 }
    );
  }
}
