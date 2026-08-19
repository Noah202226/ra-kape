import { database } from "@/appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = "68842cca00175d53d7f5";

// ---------------- POST: Add Product ----------------
export async function POST(req) {
  try {
    const body = await req.json();

    const newReview = await database.createDocument(
      DB_ID,
      COLLECTION_ID,
      "unique()",
      {
        reviewImage: body.reviewImage, // usually image URL from Appwrite Storage
        comments: body.comments,
      },
    );

    return Response.json({ success: true, product: newReview });
  } catch (err) {
    console.error("POST /api/reviews error:", err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

// ---------------- PUT: Update Review ----------------
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, comments, reviewImage } = body;

    if (!id) {
      return Response.json(
        { success: false, error: "Review ID is required" },
        { status: 400 },
      );
    }

    const updateData = {};
    if (comments !== undefined) updateData.comments = comments;
    if (reviewImage !== undefined) updateData.reviewImage = reviewImage;

    const updatedReview = await database.updateDocument(
      DB_ID,
      COLLECTION_ID,
      id,
      updateData,
    );

    return Response.json({ success: true, review: updatedReview });
  } catch (err) {
    console.error("PUT /api/reviews error:", err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
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
      { status: 400 },
    );
  }

  try {
    await database.deleteDocument(DB_ID, COLLECTION_ID, id);
    return Response.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/products error:", err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
