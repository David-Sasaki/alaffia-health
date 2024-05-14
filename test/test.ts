import request from "supertest";

import { startServer } from "../src/index";
import { createMockData, cleanUpMockData, getUserQueryData, getUserByLocationQueryData } from "./helper";
import AppDataSource from "../src/typeorm.config";

let server: any; // Variable to hold the server instance
let url: string; // Variable to hold the server URL
let userId: string; // Variable to hold the user ID
let facilityId: string; // Variable to hold the facility ID
let locationId: string; // Variable to hold the location ID

beforeAll(async () => {
    // Start the server and get the server instance and URL
    ({ server, url } = await startServer());
    // Create mock data and get the user ID, facility ID, and location ID
    ({ userId, facilityId, locationId } = await createMockData());
});

it("user query should work as expected", async () => {
    // Send a POST request to the server with user query data
    const response = await request(url).post("/").send(getUserQueryData(userId));
    // Extract user ID and facilities from the response body
    const { id, facilities } = response.body.data?.user;
    // Assert that the returned user ID matches the expected user ID
    expect(id).toBe(userId);
    // Assert that the first facility ID matches the expected facility ID
    expect(facilities[0].id).toBe(facilityId);
    // Assert that the first facility's first location ID matches the expected location ID
    expect(facilities[0]?.locations[0]?.id).toBe(locationId);
});

it("userbylocation query should work as expected", async () => {
    // Send a POST request to the server with user by location query data
    const response = await request(url)
        .post("/")
        .send(getUserByLocationQueryData(locationId));
    // Extract location ID, facility, and users from the response body
    const { id, facility, users } = response.body.data?.usersByLocation;
    // Assert that the returned location ID matches the expected location ID
    expect(id).toBe(locationId);
    // Assert that the facility ID matches the expected facility ID
    expect(facility?.id).toBe(facilityId);
    // Assert that the first user ID matches the expected user ID
    expect(users[0]?.id).toBe(userId);
});

afterAll(async () => {
    // Clean up mock data using the user ID, facility ID, and location ID
    await cleanUpMockData(userId, facilityId, locationId);
    // Destroy the data source
    await AppDataSource.destroy();
    // Stop the server
    await server?.stop();
});
