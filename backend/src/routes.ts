// routes.ts
import express, { Request, Response } from "express";
import { usersCollection, buildingsCollection } from "./database";
import { User, Building } from "./types";  // Import types from the shared file
import { ObjectId } from 'mongodb';

const router = express.Router();

router.get("/api/users", async (req: Request, res: Response) => {
  try {
    const users = await usersCollection.find<User>({}).toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
});

// POST a new user
router.post("/api/users", async (req: Request, res: Response) => {
  const newUser: User = req.body;

  try {
    const result = await usersCollection.insertOne(newUser);
    res.status(201).json({ message: "User created successfully", userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error });
  }
});

// GET a user by ID
router.get("/api/users/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await usersCollection.findOne<User>({ _id: new ObjectId(userId) });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

router.get("/api/buildings", async (req: Request, res: Response) => {
  try {
    const buildings = await buildingsCollection.find<Building>({}).toArray();
    res.status(200).json(buildings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch buildings", error });
  }
});

router.get("/api/buildings/:id", async (req: Request, res: Response) => {
  const buildingId = req.params.id;

  if (!ObjectId.isValid(buildingId)) {
    return res.status(400).json({ message: "Invalid building ID" });
  }

  try {
    const building = await buildingsCollection.findOne<Building>({
      _id: new ObjectId(buildingId)
    });

    if (building) {
      res.status(200).json(building);
    } else {
      res.status(404).json({ message: "Building not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching building", error });
  }
});

export default router;
