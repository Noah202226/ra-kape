// Test endpoint to verify database connection
import { database } from "@/appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const PRODUCTS_COLLECTION = "products";

export async function GET() {
  try {
    console.log("🔍 Testing database connection...");
    console.log("Database ID:", DB_ID);
    console.log("Collection ID:", PRODUCTS_COLLECTION);
    console.log("Endpoint:", process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT);
    console.log("Project ID:", process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

    if (!DB_ID) {
      return Response.json({
        success: false,
        error: "DB_ID not configured",
        env: {
          DB_ID,
          endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
          projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
        },
      });
    }

    // Try to list documents from products collection
    const products = await database.listDocuments(DB_ID, PRODUCTS_COLLECTION);
    console.log("✅ Database & Products collection connected! Found:", products.documents.length, "products");
    
    return Response.json({
      success: true,
      message: "Database and collection connected successfully",
      productsCount: products.documents.length,
      firstProduct: products.documents[0] ? {
        id: products.documents[0].$id,
        name: products.documents[0].productName,
        hasImage: !!products.documents[0].image,
      } : null,
      env: {
        DB_ID,
        PRODUCTS_COLLECTION,
        endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
        projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
      },
    });
  } catch (err) {
    console.error("❌ Database test failed:", err.message);
    console.error("Full error:", err);
    return Response.json({
      success: false,
      error: err.message,
      details: err.toString(),
      cause: err.cause || "Unknown",
    }, { status: 500 });
  }
}
