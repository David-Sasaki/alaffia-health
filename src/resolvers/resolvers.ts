import { GraphQLError } from "graphql";
import { addUser, getUserById } from "../controllers/userController";
import { addLocation, getLocationById } from "../controllers/locationController";
import { addFacility, getFacilityById } from "../controllers/facilityController";

const Resolvers = {
    Query: {
        // Resolver for retrieving a user by ID
        user: async (_: any, { id }: any) => {
            try {
                // Call controller function to get user by ID
                const user = await getUserById(id);
                if (!user) {
                    // If user not found, throw an error
                    throw new Error("Invalid user id");
                }
                return user;
            } catch (error) {
                // Catch and log any errors
                console.error("Error querying getUserById", error);
                // Throw a GraphQL error with error message and code
                throw new GraphQLError(error?.toString() ?? "", {
                    extensions: { code: "Bad Request" },
                });
            }
        },

        // Resolver for retrieving users by location
        usersByLocation: async (_: any, { id }: any) => {
            try {
                // Call controller function to get location by ID
                const location = await getLocationById(id);
                if (!location) {
                    // If location not found, throw an error
                    throw new Error("Invalid location id");
                }
                // Retrieve facility based on location
                const facility = await getFacilityById(location?.facility.id ?? "");
                if (!facility) {
                    // If facility not found, throw an error
                    throw new Error("Invalid facility id");
                }
                // Return location details along with associated users from the facility
                return {
                    ...location,
                    users: facility?.users,
                };
            } catch (error) {
                // Catch and log any errors
                console.error("Error querying getLocationById", error);
                // Throw a GraphQL error with error message and code
                throw new GraphQLError(error?.toString() ?? "", {
                    extensions: { code: "Bad Request" },
                });
            }
        },
    },

    Mutation: {
        // Resolver for adding a new user
        addUser: async (
            _: any,
            { firstName, lastName, email, role, facilities }: any
        ) => {
            try {
                // Call controller function to add a new user
                return await addUser(firstName, lastName, email, role, facilities);
            } catch (error) {
                // Catch and log any errors
                console.error("Error creating a user", error);
                // Throw a GraphQL error with error message and code
                throw new GraphQLError(error?.toString() ?? "", {
                    extensions: { code: "Bad Request" },
                });
            }
        },

        // Resolver for adding a new facility
        addFacility: async (_: any, { name, users, locations }: any) => {
            try {
                // Call controller function to add a new facility
                return await addFacility(name, users, locations);
            } catch (error) {
                // Catch and log any errors
                console.error("Error creating a facility", error);
                // Throw a GraphQL error with error message and code
                throw new GraphQLError(error?.toString() ?? "", {
                    extensions: { code: "Bad Request" },
                });
            }
        },

        // Resolver for adding a new location
        addLocation: async (_: any, { state, zip, address, facility }: any) => {
            try {
                // Call controller function to add a new location
                return await addLocation(state, zip, address, facility);
            } catch (error) {
                // Catch and log any errors
                console.error("Error creating a location", error);
                // Throw a GraphQL error with error message and code
                throw new GraphQLError(error?.toString() ?? "", {
                    extensions: { code: "Bad Request" },
                });
            }
        },
    },
};

export default Resolvers;
