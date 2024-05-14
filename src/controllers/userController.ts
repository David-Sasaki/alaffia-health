// Importing necessary modules and entities
import AppDataSource from "../typeorm.config"; // Assuming this is your connection to the database
import { User } from "../entities/User"; // Importing the User entity
import { getFacilityByIds } from "./facilityController"; // Importing a function to get facilities by their IDs

// Function to get a user by ID
export const getUserById = async (id: string) => {
    // Creating a query builder instance to build a query
    const user = await AppDataSource.createQueryBuilder()
        .select("user") // Selecting the user entity
        .from(User, "user") // Specifying the entity and alias
        .leftJoinAndSelect("user.facilities", "facilities") // Joining user with facilities
        .leftJoinAndSelect("facilities.locations", "locations") // Joining facilities with locations
        .where("user.id = :id", { id: id }) // Filtering by user ID
        .getOne(); // Getting a single result
    return user; // Returning the user
};

// Function to get users by their IDs
export const getUserByIds = async (ids: string[]) => {
    // Creating a query builder instance to build a query
    const users = await AppDataSource.createQueryBuilder()
        .select("user") // Selecting the user entity
        .from(User, "user") // Specifying the entity and alias
        .where("user.id in (:...ids)", { ids: ids }) // Filtering by user IDs
        .getMany(); // Getting multiple results
    return users; // Returning the users
};

// Function to add a new user
export const addUser = async (
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    facilityIds?: string[]
) => {
    // Creating a new user instance
    const newUser = new User();
    newUser.firstName = firstName; // Setting first name
    newUser.lastName = lastName; // Setting last name
    newUser.email = email; // Setting email
    newUser.role = role; // Setting role

    // If facility IDs are provided, fetch and assign facilities to the user
    if (facilityIds) {
        const facilities = await getFacilityByIds(facilityIds); // Fetching facilities by IDs
        newUser.facilities = facilities; // Assigning facilities to the user
    }

    // Saving the new user to the database
    await AppDataSource.manager.save(newUser);

    // Returning the newly created user by fetching it from the database
    return await getUserById(newUser.id);
};
