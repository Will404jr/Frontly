import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/MongodbClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { ObjectId } from "mongodb";

async function connectToDatabase() {
  const client = await clientPromise;
  return client.db("Next-app").collection("journal_entries");
}

// PUT - Update a specific journal entry by ID
export async function PUT(request: NextRequest) {
    try {
      const id = request.nextUrl.pathname.split('/').pop(); // Extract the ID from the URL path
      const { title, content } = await request.json();
      
      const session = await getServerSession(authOptions);
      if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      if (!id || !ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
      }
  
      const collection = await connectToDatabase();
      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id), email: session.user.email },
        { $set: { title, content, updatedAt: new Date() } },
        { returnDocument: "after" }
      );
  
      if (!result || !result.value) {
        return NextResponse.json({ error: "Journal entry not found" }, { status: 404 });
      }
  
      return NextResponse.json(result.value);
    } catch (error) {
      console.error("Failed to update journal entry:", error);
      return NextResponse.json({ error: "Failed to update journal entry" }, { status: 500 });
    }
}
