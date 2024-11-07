import { MongoClient } from "mongodb";

const uri = "ENTER HERE";
export const client = new MongoClient(uri);
export const db = client.db("ENTER HERE");
export const users = db.collection("ENTER HERE");
export const buildings = db.collection("ENTER HERE");
