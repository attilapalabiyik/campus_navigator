import request from 'supertest';
import { app } from '../src/app'; 

describe('API Routes', () => {

  // 1. Health Check Route Test
  it('should return a health check response', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'running' });
  });

  // 2. Test for fetching users
  it('should fetch a list of users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200); // Ensure status is 200
    expect(Array.isArray(response.body)).toBe(true); // Response should be an array of users
  });

  // 3. Test for creating a user
  it('should create a new user', async () => {
    const newUser = { name: 'John Doe', email: 'john.doe@example.com' };
    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(201); // Should return 201 Created
    expect(response.body.message).toBe('User created successfully'); // Expected success message
    expect(response.body.userId).toBeDefined(); // Should return user ID
  });

  // 4. Test for invalid user data during creation
  it('should return 400 for invalid user data', async () => {
    const invalidUser = { name: 'John Doe' }; // Missing email
    const response = await request(app)
      .post('/api/users')
      .send(invalidUser)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(400); // Should return 400 Bad Request
    expect(response.body.message).toBe('Validation failed'); // Expected error message
  });

  // 5. Test for fetching a user by ID
  it('should return a user by ID', async () => {
    const userId = '60d0fe4f5311236168a109ca'; 
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(200); // Should return 200 OK
    expect(response.body).toHaveProperty('id', userId); // Should match the user ID
  });

  // 6. Test for 404 when a user is not found by ID
  it('should return 404 if the user is not found', async () => {
    const userId = '60d0fe4f6168a109ca'; // Non-existing User ID
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(404); // Should return 404 Not Found
    expect(response.body.message).toBe('User not found'); // Expected message
  });

  // 7. Test for invalid user ID format
  it('should return 400 for invalid user ID format', async () => {
    const invalidId = 'invalid-format-id';
    const response = await request(app).get(`/api/users/${invalidId}`);
    expect(response.status).toBe(400); // Should return 400 Bad Request
    expect(response.body.message).toBe('Invalid user ID format'); // Expected message
  });

  // 8. Test for updating a user
  it('should update an existing user', async () => {
    const userId = '60d0fe4f5311236168a109ca'; 
    const updatedUser = { name: 'John Updated' };
    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send(updatedUser)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200); // Should return 200 OK
    expect(response.body.name).toBe('John Updated'); // Ensure name is updated
  });

  // 9. Test for deleting a user
  it('should delete a user by ID', async () => {
    const userId = '60d0fe4f5311236168a109ca'; 
    const response = await request(app).delete(`/api/users/${userId}`);
    expect(response.status).toBe(200); // Should return 200 OK
    expect(response.body.message).toBe('User deleted successfully'); // Expected success message
  });

  // 10. Test for getting all buildings
  it('should return all buildings if no search query is provided', async () => {
    const response = await request(app).get('/api/buildings');
    expect(response.status).toBe(200); // Should return 200 OK
    expect(Array.isArray(response.body)).toBe(true); // Response should be an array
  });

  // 11. Test for getting filtered buildings with a search query
  it('should return filtered buildings if a search query is provided', async () => {
    const response = await request(app).get('/api/buildings?search=Library');
    expect(response.status).toBe(200); // Should return 200 OK
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: expect.stringContaining("Library") }) // Expected filtered buildings
    ]));
  });

  // 12. Test for getting a building by ID
  it('should return a building by ID', async () => {
    const buildingId = '60d0fe4f5311236168a109cb'; 
    const response = await request(app).get(`/api/buildings/${buildingId}`);
    expect(response.status).toBe(200); // Should return 200 OK
    expect(response.body).toHaveProperty('_id', buildingId); // Should match the building ID
  });

  // 13. Test for 404 when building is not found by ID
  it('should return 404 if the building is not found', async () => {
    const buildingId = 'nonexistent-building-id';
    const response = await request(app).get(`/api/buildings/${buildingId}`);
    expect(response.status).toBe(404); // Should return 404 Not Found
    expect(response.body.message).toBe('Building not found'); // Expected message
  });

  // 14. Test for invalid building ID format
  it('should return 400 for invalid building ID format', async () => {
    const invalidId = 'invalid-format-id';
    const response = await request(app).get(`/api/buildings/${invalidId}`);
    expect(response.status).toBe(400); // Should return 400 Bad Request
    expect(response.body.message).toBe('Invalid building ID format'); // Expected message
  });

  // 15. Test for server error handling
  it('should return 500 when there is a server error', async () => {
    jest.spyOn(app, 'get').mockImplementationOnce(() => {
      throw new Error("Database error");
    });
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(500); // Should return 500 Server Error
    expect(response.body.message).toBe("Database error"); // Expected error message
  });

});


