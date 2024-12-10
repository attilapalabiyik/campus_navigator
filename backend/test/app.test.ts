import request from 'supertest';
import { app } from '../src/app';

describe("Health Check", () => {
  // Test to verify if the health check endpoint is working correctly
  it("should return a health check response", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200); // Should return 200 OK
    expect(response.body).toEqual({ status: "running" }); // Expected response body
  });
});

describe("Invalid Route", () => {
  // Test for undefined routes
  it("should return 404 for an undefined route", async () => {
    const response = await request(app).get("/undefined-route");
    expect(response.status).toBe(404); // Should return 404 Not Found
  });
});

describe("GET /api/users", () => {
  // Test to fetch users
  it("should return an array of users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200); // Should return 200 OK
    expect(Array.isArray(response.body)).toBe(true); // Response should be an array
  });

  // Test for server error
  it("should return 500 when there is a server error", async () => {
    jest.spyOn(app, 'get').mockImplementationOnce(() => {
      throw new Error("Database error");
    });

    const response = await request(app).get("/api/users");
    expect(response.status).toBe(500); // Should return 500 Internal Server Error
  });
});

describe("POST /api/users", () => {
  // Test to create a new user
  it("should create a new user", async () => {
    const newUser = {
      name: "John Doe",
      email: "john.doe@example.com",
      age: 30
    };

    const response = await request(app)
      .post("/api/users")
      .send(newUser)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201); // Should return 201 Created
    expect(response.body.message).toBe("User created successfully"); // Expected success message
    expect(response.body.userId).toBeDefined(); // Should return user ID
  });

  // Test for invalid user data
  it("should return 400 for invalid user data", async () => {
    const invalidUser = {
      name: "John Doe"
    };

    const response = await request(app)
      .post("/api/users")
      .send(invalidUser)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400); // Should return 400 Bad Request
    expect(response.body.message).toBe("Validation failed"); // Expected error message
  });
});

describe("GET /api/users/:id", () => {
  // Test to fetch a user by ID
  it("should return a user by ID", async () => {
    const userId = "60d0fe4f5311236168a109ca"; 

    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(200); // Should return 200 OK
    expect(response.body).toHaveProperty("id", userId); // Should match the user ID
  });

  // Test if the user is not found
  it("should return 404 if the user is not found", async () => {
    const userId = "60d0fe4f5311236168a109cb"; // Non-existing user ID

    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(404); // Should return 404 Not Found
    expect(response.body.message).toBe("User not found"); // Expected message
  });

  // Test for invalid user ID format
  it("should return 400 for invalid user ID format", async () => {
    const userId = "60d0fe4f53112";

    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(400); // Should return 400 Bad Request
    expect(response.body.message).toBe("Invalid user ID format"); // Expected message
  });
});

describe("GET /api/buildings", () => {
  // Test to return all buildings
  it("should return all buildings if no search query is provided", async () => {
    const response = await request(app).get("/api/buildings");
    expect(response.status).toBe(200); // Should return 200 OK
    expect(Array.isArray(response.body)).toBe(true); // Response should be an array
  });

  // Test to return filtered buildings based on search query
  it("should return filtered buildings if a search query is provided", async () => {
    const response = await request(app).get("/api/buildings?search=Library");
    expect(response.status).toBe(200); // Should return 200 OK
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: expect.stringContaining("Library") })
    ])); // Expected filtered buildings
  });

  // Test for error while fetching buildings
  it("should return 500 if there is an error fetching buildings", async () => {
    jest.spyOn(app, 'get').mockImplementationOnce(() => {
      throw new Error("Database error");
    });

    const response = await request(app).get("/api/buildings");
    expect(response.status).toBe(500); // Should return 500 Internal Server Error
    expect(response.body.message).toBe("Failed to fetch buildings"); // Expected error message
  });
});

describe("GET /api/buildings/:id", () => {
  // Test to fetch a building by ID
  it("should return a building by ID", async () => {
    const buildingId = "60d0fe4f5311236168a109cb"; // 

    const response = await request(app).get(`/api/buildings/${buildingId}`);
    expect(response.status).toBe(200); // Should return 200 OK
    expect(response.body).toHaveProperty("_id", buildingId); // Should match the building ID
  });

  // Test if the building is not found
  it("should return 404 if the building is not found", async () => {
    const buildingId = "60d0fe4f36168a109cb"; // Non-existing building ID

    const response = await request(app).get(`/api/buildings/${buildingId}`);
    expect(response.status).toBe(404); // Should return 404 Not Found
    expect(response.body.message).toBe("Building not found"); // Expected message
  });

  // Test for invalid building ID format
  it("should return 400 for invalid building ID format", async () => {
    const buildingId = "invalid-format-id";

    const response = await request(app).get(`/api/buildings/${buildingId}`);
    expect(response.status).toBe(400); // Should return 400 Bad Request
    expect(response.body.message).toBe("Invalid building ID format"); // Expected message
  });
});

describe("Error Handling", () => {
  // Test to handle unexpected server errors gracefully
  it("should handle unexpected server errors gracefully", async () => {
    jest.spyOn(app, 'get').mockImplementationOnce(() => {
      throw new Error("Unexpected server error");
    });

    const response = await request(app).get("/api/users");
    expect(response.status).toBe(500); // Should return 500 Internal Server Error
    expect(response.body.message).toBe("Internal server error"); // Expected error message
  });
});
