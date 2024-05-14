import AppDataSource from "../src/typeorm.config";
import { User } from "../src/entities/User";
import { Facility } from "../src/entities/Facility";
import { Location } from "../src/entities/Location";

// Function to create mock data for testing
export const createMockData = async () => {
    // Creating a new facility
    const facility = new Facility();
    facility.name = "testfacility";
    await AppDataSource.manager.save(facility);

    // Creating a new user associated with the facility
    const user = new User();
    user.firstName = "firstName";
    user.lastName = "lastname";
    user.email = "test@gmail.com";
    user.role = "Doctor";
    user.facilities = [facility];
    await AppDataSource.manager.save(user);

    // Creating a new location associated with the facility
    const location = new Location();
    location.address = "testaddress";
    location.state = "teststate";
    location.zip = "testzip";
    location.facility = facility;
    await AppDataSource.manager.save(location);

    // Returning the IDs of the created entities
    return { userId: user.id, facilityId: facility.id, locationId: location.id };
};

// Function to clean up the mock data after testing
export const cleanUpMockData = async (
    userId: string,
    facilityId: string,
    locationId: string
) => {
    // Finding and removing the user
    const user = await AppDataSource.manager.findOne(User, userId);
    await AppDataSource.manager.remove(user);

    // Finding and removing the location
    const location = await AppDataSource.manager.findOne(Location, locationId);
    await AppDataSource.manager.remove(location);

    // Finding and removing the facility
    const facility = await AppDataSource.manager.findOne(Facility, facilityId);
    await AppDataSource.manager.remove(facility);
};

// Function to generate GraphQL query data for retrieving a user by ID
export const getUserQueryData = (userId: string) => {
    const queryData = {
        query: `query Query($userId: String) {
      user(id: $userId) {
        createdAt
        email
        firstName
        lastName
        role
        id
        facilities {
          createdAt
          id
          locations {
            address
            id
            state
            zip
          }
          name
        }
      }
    }`,
        variables: { userId },
    };
    return queryData;
};

// Function to generate GraphQL query data for retrieving users by location ID
export const getUserByLocationQueryData = (locationId: string) => {
    const queryData = {
        query: `query Query($usersByLocationId: String) {
      usersByLocation(id: $usersByLocationId) {
        address
        id
        state
        zip
        facility {
          createdAt
          id
          name
        }
        users {
          createdAt
          email
          firstName
          id
          lastName
          role
        }
      }
    }`,
        variables: { usersByLocationId: locationId },
    };
    return queryData;
};
