import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB = process.env.MONGODB_DB as string;

let client: MongoClient;
let db: Db;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable');
}

async function connectToDatabase() {
  if (db) {
    return { client, db };
  }

  client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db(MONGODB_DB);

  return { client, db };
}

export default connectToDatabase;
