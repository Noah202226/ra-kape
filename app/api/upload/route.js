// app/api/upload/route.js
import { storage } from "@/appwrite";
import { ID } from "appwrite";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file"); // Must be a File object

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const result = await storage.createFile("images", ID.unique(), file);

    const fileUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/images/files/${result.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;

    return new Response(JSON.stringify({ success: true, fileUrl }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
