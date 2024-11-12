// database.ts
import { MongoClient, Db, Collection } from "mongodb";
import { User, Building } from "./types";  // Import types from the shared file

let db: Db;

export let usersCollection: Collection<User>;
export let buildingsCollection: Collection<Building>;

export const connectDB = async () => {
  const client = new MongoClient("mongodb://localhost:27017");
  await client.connect();
  db = client.db("campus_navigator");

  usersCollection = db.collection<User>("users");
  buildingsCollection = db.collection<Building>("buildings");
};
