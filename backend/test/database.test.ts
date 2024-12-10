import { MongoClient } from "mongodb";
import { connectDB, usersCollection, buildingsCollection } from "../src/database";

// Mock MongoDB and its methods
const mockCollection = jest.fn();
const closeMock = jest.fn();

const mockDb = jest.fn(() => ({
  collection: mockCollection,  // Mocking the collection method
  close: closeMock,            // Mocking the close method
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

  // 1. Basic test: Check if the database and collections are initialized correctly
  it("should initialize database and collections", async () => {
    const mockUsersCollection = {};
    const mockBuildingsCollection = {};

    mockCollection.mockImplementation((name: string) => {
      if (name === "users") return mockUsersCollection;
      if (name === "buildings") return mockBuildingsCollection;
    });

    await connectDB();

    expect(usersCollection).toBe(mockUsersCollection);
    expect(buildingsCollection).toBe(mockBuildingsCollection);
    expect(mockConnect).toHaveBeenCalledTimes(1); // MongoClient connect should be called once
    expect(mockDb).toHaveBeenCalledTimes(1); // db method should be called once
    expect(mockCollection).toHaveBeenCalledWith("users");
    expect(mockCollection).toHaveBeenCalledWith("buildings");
  });

  // 2. Edge case: Check if connectDB function handles errors properly
  it("should handle errors during database connection", async () => {
    const errorMessage = "Database connection failed";
    mockConnect.mockRejectedValueOnce(new Error(errorMessage)); // Simulate an error during MongoClient connection

    try {
      await connectDB();
    } catch (error) {
      // Type assertion to Error type
      expect((error as Error).message).toBe(errorMessage); // Verify that the error is handled properly
    }

    expect(mockConnect).toHaveBeenCalledTimes(1); // Ensure that connect was still called once
  });

  // 3. Edge case: Test what happens when the collection names are different
  it("should handle collections with different names", async () => {
    const mockOtherCollection = {};
    mockCollection.mockImplementation((name: string) => {
      if (name === "users") return mockOtherCollection; // Return mock collection for users
      if (name === "buildings") return mockOtherCollection; // Return mock collection for buildings
    });

    await connectDB();

    expect(usersCollection).toBe(mockOtherCollection);
    expect(buildingsCollection).toBe(mockOtherCollection);
  });

  // 4. Edge case: Test if `connectDB` is called only once even if it’s called multiple times
  it("should only call connectDB once if called multiple times", async () => {
    // Mock the implementation of connectDB so that it doesn't call mockConnect multiple times
    mockConnect.mockImplementationOnce(() => Promise.resolve());

    await connectDB();
    await connectDB(); // Call it again to ensure it does not call connect more than once

    expect(mockConnect).toHaveBeenCalledTimes(1); // It should only connect once, not multiple times
  });

  // 5. Test if the database returns the correct collection names when provided
  it("should return correct collection names from MongoDB", async () => {
    const mockUsersCollection = {};
    const mockBuildingsCollection = {};

    mockCollection.mockImplementation((name: string) => {
      if (name === "users") return mockUsersCollection;
      if (name === "buildings") return mockBuildingsCollection;
    });

    await connectDB();

    expect(usersCollection).toBe(mockUsersCollection);
    expect(buildingsCollection).toBe(mockBuildingsCollection);
  });

  // 6. Test when no collections are available (simulate empty database)
  it("should handle case where collections are not available", async () => {
    mockCollection.mockImplementation(() => {
      throw new Error("Collection not found"); // Simulate missing collection
    });

    try {
      await connectDB();
    } catch (error) {
      // Type assertion to Error type
      expect((error as Error).message).toBe("Collection not found"); // Expect error related to collection absence
    }

    expect(mockConnect).toHaveBeenCalledTimes(1); // Ensure the MongoDB client connect was still called
  });

  // 7. Check if connectDB returns the collections as expected
  it("should return collections as expected", async () => {
    const mockUsersCollection = {};
    const mockBuildingsCollection = {};

    mockCollection.mockImplementation((name: string) => {
      if (name === "users") return mockUsersCollection;
      if (name === "buildings") return mockBuildingsCollection;
    });

    await connectDB();

    expect(usersCollection).toBe(mockUsersCollection);
    expect(buildingsCollection).toBe(mockBuildingsCollection);
  });

  // 8. Check if MongoDB connect is attempted even if no collections are returned
  it("should attempt to connect even if collections are not returned", async () => {
    mockCollection.mockImplementation(() => {
      // Simulate no collection being returned
      return null;
    });

    await connectDB();

    expect(mockConnect).toHaveBeenCalledTimes(1); // Should still attempt to connect to MongoDB
  });

  // 9. Test case where MongoClient's connect throws an error during initialization
  it("should throw an error if MongoClient fails to connect", async () => {
    const errorMessage = "Connection to database failed";
    mockConnect.mockRejectedValueOnce(new Error(errorMessage)); // Simulate MongoClient connect failure

    try {
      await connectDB();
    } catch (error) {
      // Type assertion to Error type
      expect((error as Error).message).toBe(errorMessage); // Ensure the error message is the expected one
    }

    expect(mockConnect).toHaveBeenCalledTimes(1); // Ensure connect is called only once
  });
});
