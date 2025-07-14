import { Client, Databases, Account, Storage } from "appwrite";

const client = new Client();

client
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT);

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client)

export { client, account, database, storage };
