// Import necessary modules and entities
import AppDataSource from "../typeorm.config";
import { Location } from "../entities/Location";
import { getFacilityById } from "./facilityController";

// Function to retrieve a location by its ID
export const getLocationById = async (id: string) => {
    // Query the database to get the location with the specified ID
    const location = await AppDataSource.createQueryBuilder()
        .select("location")
        .from(Location, "location")
        .leftJoinAndSelect("location.facility", "facility")
        .where("location.id = :id", { id: id })
        .getOne();
    return location; // Return the location
};

// Function to retrieve locations by their IDs
export const getLocationByIds = async (ids: string[]) => {
    // Query the database to get locations with the specified IDs
    const locations = await AppDataSource.createQueryBuilder()
        .select("location")
        .from(Location, "location")
        .where("location.id in (:...ids)", { ids: ids })
        .getMany();
    return locations; // Return the locations
};

// Function to add a new location
export const addLocation = async (
    state: string,
    zip: string,
    address: string,
    facilityId: string
) => {
    // Create a new Location object with provided details
    const newLocation = new Location();
    newLocation.state = state;
    newLocation.zip = zip;
    newLocation.address = address;

    // Get the facility associated with the provided facility ID
    const facility = await getFacilityById(facilityId);
    newLocation.facility = facility!;

    // Save the new location to the database
    await AppDataSource.manager.save(newLocation);

    return newLocation; // Return the newly created location
};
