import request from "supertest";
import { app } from "../src/app";

describe("App Routes", () => {
  it("should return a health check response", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "running" });
  });

});
