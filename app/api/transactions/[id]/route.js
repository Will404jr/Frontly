import { NextResponse } from "next/server";
import clientPromise from "../../../lib/MongodbClient";
import { ObjectId } from "mongodb";

export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("financeTracker");
    const { id } = params;
    const result = await db
      .collection("transactions")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Transaction deleted successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to delete transaction" },
      { status: 500 }
    );
  }
}
