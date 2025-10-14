import { database } from "@/appwrite";

const DB_ID = "6870ab6f0018df40fa94";
const COLLECTION_ID = "products";

// ---------------- POST: Add Product ----------------
export async function POST(req) {
  try {
    const body = await req.json();

    const newProduct = await database.createDocument(
      DB_ID,
      COLLECTION_ID,
      "unique()",
      {
        productName: body.name,
        priceSmall: parseInt(body.priceSmall),
        priceLarge: parseInt(body.priceLarge),
        productDescription: body.description,
        category: body.category,
        image: body.image,
        productType: body.productType,
        isAvailable: body.isAvailable ?? true, // <--- new field
      }
    );

    return Response.json({ success: true, product: newProduct });
  } catch (err) {
    console.error("POST /api/products error:", err);
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
    console.log("Getting all products", res.documents);
    return Response.json({ success: true, products: res.documents });
  } catch (err) {
    console.error("GET /api/products error:", err);
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
