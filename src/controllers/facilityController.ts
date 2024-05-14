import AppDataSource from "../typeorm.config"; // Import the TypeORM configuration
import { getUserByIds } from "./userController"; // Import function to get users by IDs
import { getLocationByIds } from "./locationController"; // Import function to get locations by IDs
import { Facility } from "../entities/Facility"; // Import the Facility entity

// Function to retrieve a facility by its ID
export const getFacilityById = async (id: string) => {
    // Create a query builder to select a facility
    const facility = await AppDataSource.createQueryBuilder()
        .select("facility")
        .from(Facility, "facility")
        .leftJoinAndSelect("facility.users", "users") // Left join to retrieve associated users
        .where("facility.id = :id", { id: id }) // Filter by facility ID
        .getOne(); // Execute the query and get a single result
    return facility; // Return the retrieved facility
};

// Function to retrieve facilities by their IDs
export const getFacilityByIds = async (ids: string[]) => {
    // Create a query builder to select facilities
    const facilities = await AppDataSource.createQueryBuilder()
        .select("facility")
        .from(Facility, "facility")
        .where("facility.id in (:...ids)", { ids: ids }) // Filter by facility IDs
        .getMany(); // Execute the query and get multiple results
    return facilities; // Return the retrieved facilities
};

// Function to add a new facility
export const addFacility = async (
    name: string,
    userIds?: string[],
    locationIds?: string[]
) => {
    // Create a new instance of Facility entity
    const newFacility = new Facility();
    newFacility.name = name; // Set the name of the facility

    // If user IDs are provided, associate users with the facility
    if (userIds) {
        const users = await getUserByIds(userIds); // Retrieve users by their IDs
        newFacility.users = users; // Set the users associated with the facility
    }

    // If location IDs are provided, associate locations with the facility
    if (locationIds) {
        const locations = await getLocationByIds(locationIds); // Retrieve locations by their IDs
        newFacility.locations = locations; // Set the locations associated with the facility
    }

    // Save the new facility to the database
    await AppDataSource.manager.save(newFacility);

    return newFacility; // Return the newly created facility
};
