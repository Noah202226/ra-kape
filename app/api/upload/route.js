// app/api/upload/route.js
import { storage } from '@/appwrite'
import { ID } from 'appwrite';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file'); // Must be a File object

  try {
    const result = await storage.createFile('images', ID.unique(), file);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
