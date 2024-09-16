import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/MongodbClient"; // Assuming you're using clientPromise for MongoDB

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const client = await clientPromise;
    const db = client.db("your-database-name");
    const result = await db
      .collection("stickynotes")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "Note deleted successfully" });
    } else {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete the note" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { content, tags, color } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db("your-database-name");
    const result = await db.collection("stickynotes").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          content: content,
          tags: tags,
          color: color,
        },
      }
    );

    if (result.matchedCount === 1) {
      return NextResponse.json({ message: "Note updated successfully" });
    } else {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update the note" },
      { status: 500 }
    );
  }
}
