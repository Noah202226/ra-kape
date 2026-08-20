import { database } from "@/appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = "products";

// Debug log on initialization
if (!DB_ID) {
  console.error("⚠️ FATAL: DATABASE_ID is not set! Check .env file");
}

// ---------------- POST: Add Product ----------------
export async function POST(req) {
  try {
    // Debug logging
    console.log("\n📦 ===== POST /api/products =====");
    console.log("Database ID:", DB_ID);
    console.log("Collection ID:", COLLECTION_ID);
    
    const body = await req.json();
    console.log("Request received for product:", body.name);

    if (!DB_ID) {
      throw new Error("DATABASE_ID is not configured. Check NEXT_PUBLIC_APPWRITE_DATABASE_ID in .env");
    }

    // Log the exact data being sent
    const productData = {
      productName: body.name,
      priceSmall: parseInt(body.priceSmall),
      priceLarge: parseInt(body.priceLarge),
      productDescription: body.description,
      category: body.category,
      image: body.image,
      productType: body.productType,
      isAvailable: body.isAvailable ?? true,
    };
    
    console.log("Creating document with data:", productData);

    const newProduct = await database.createDocument(
      DB_ID,
      COLLECTION_ID,
      "unique()",
      productData,
    );

    console.log("✅ Product created successfully! ID:", newProduct.$id);
    return Response.json({ success: true, product: newProduct });
  } catch (err) {
    console.error("❌ POST /api/products ERROR:", err.message);
    console.error("Error code:", err.code);
    console.error("Error type:", err.type);
    console.error("Full stack:", err);
    
    return Response.json(
      { 
        success: false, 
        error: err.message,
        errorCode: err.code,
        errorType: err.type,
        hint: "Check that the database and collection exist, and you have permission to create documents"
      },
      { status: 500 },
    );
  }
}

// ---------------- GET: List All Products ----------------
export async function GET() {
  try {
    console.log("\n📖 ===== GET /api/products =====");
    console.log("Database ID:", DB_ID);

    if (!DB_ID) {
      throw new Error("DATABASE_ID is not configured. Check NEXT_PUBLIC_APPWRITE_DATABASE_ID in .env");
    }

    const res = await database.listDocuments(DB_ID, COLLECTION_ID);
    console.log("✅ Retrieved", res.documents.length, "products");
    return Response.json({ success: true, products: res.documents });
  } catch (err) {
    console.error("❌ GET /api/products error:", err.message);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

// ---------------- PUT: Update Product ----------------
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    console.log("\n✏️ ===== PUT /api/products =====");
    console.log("Updating product ID:", id);

    if (!id) {
      return Response.json(
        { success: false, error: "Product ID is required" },
        { status: 400 },
      );
    }

    const updatedProduct = await database.updateDocument(
      DB_ID,
      COLLECTION_ID,
      id,
      updateData,
    );

    console.log("✅ Product updated successfully:", id);
    return Response.json({ success: true, product: updatedProduct });
  } catch (err) {
    console.error("❌ PUT /api/products error:", err.message);
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
    console.log("\n🗑️ ===== DELETE /api/products =====");
    console.log("Deleting product ID:", id);
    
    if (!DB_ID) {
      throw new Error("DATABASE_ID is not configured. Check NEXT_PUBLIC_APPWRITE_DATABASE_ID in .env");
    }

    await database.deleteDocument(DB_ID, COLLECTION_ID, id);
    console.log("✅ Product deleted successfully:", id);
    return Response.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error("❌ DELETE /api/products error:", err.message);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
