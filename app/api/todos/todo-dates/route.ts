import { NextResponse } from "next/server";
import clientPromise from "@/lib/MongodbClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Fetch all unique dates with todos
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // Ensure user is logged in
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("Next-app");

    // Fetch unique dates where the user has todos
    const todoDates = await db
      .collection("todos")
      .distinct("date", { email: session.user.email });

    return NextResponse.json(todoDates, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch todo dates:", error);
    return NextResponse.json(
      { error: "Failed to fetch todo dates" },
      { status: 500 }
    );
  }
}
