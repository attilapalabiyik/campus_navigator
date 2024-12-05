import { MongoClient } from "mongodb";
import { connectDB, usersCollection, buildingsCollection } from "../src/database";

// Mock MongoDB and its methods
const mockCollection = jest.fn();
const mockDb = jest.fn(() => ({
  collection: mockCollection,
}));
const mockConnect = jest.fn();

jest.mock("mongodb", () => {
  return {
    MongoClient: jest.fn().mockImplementation(() => ({
      connect: mockConnect,
      db: mockDb,
    })),
  };
});

describe("Database Connection", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mock calls before each test
  });

  it("should initialize database and collections", async () => {
    // Mock return values for collections
    const mockUsersCollection = {};
    const mockBuildingsCollection = {};

    mockCollection.mockImplementation((name: string) => {
      if (name === "users") return mockUsersCollection;
      if (name === "buildings") return mockBuildingsCollection;
    });

    // Call the connectDB function
    await connectDB();

    // Ensure collections are defined
    expect(usersCollection).toBe(mockUsersCollection);
    expect(buildingsCollection).toBe(mockBuildingsCollection);

    // Verify the mocked MongoClient was called
    expect(mockConnect).toHaveBeenCalledTimes(1);
    expect(mockDb).toHaveBeenCalledTimes(1);

    // Verify that the `collection` method was called with the correct names
    expect(mockCollection).toHaveBeenCalledWith("users");
    expect(mockCollection).toHaveBeenCalledWith("buildings");
  });
});
