import { database } from "@/appwrite";

const DB_ID = "6870ab6f0018df40fa94";
const COLLECTION_ID = "689898d3001b38bc0cf3";

// ---------------- POST: Add Event ----------------
export async function POST(req) {
  try {
    const body = await req.json();

    const newEvent = await database.createDocument(
      DB_ID,
      COLLECTION_ID,
      "unique()",
      {
        img: body.img, // usually image URL from Appwrite Storage
        title: body.title,
        desc: body.desc,
        date: body.date,
        location: body.location,
      }
    );

    return Response.json({ success: true, event: newEvent });
  } catch (err) {
    console.error("POST /api/events error:", err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// ---------------- GET: List All Products ----------------
export async function GET() {
  try {
    const res = await database.listDocuments(DB_ID, COLLECTION_ID);
    console.log("Getting all events", res.documents);
    return Response.json({ success: true, events: res.documents });
  } catch (err) {
    console.error("GET /api/events error:", err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// ---------------- DELETE: Remove Product by ID ----------------
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json(
      { success: false, error: "Product ID is required" },
      { status: 400 }
    );
  }

  try {
    await database.deleteDocument(DB_ID, COLLECTION_ID, id);
    return Response.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/products error:", err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
