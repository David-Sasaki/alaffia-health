import { gql } from "apollo-server-express";

const Schema = gql`
    # Define the User type representing a user
    type User {
        id: String!                 # Unique identifier for the user
        firstName: String!          # First name of the user
        lastName: String!           # Last name of the user
        email: String!              # Email of the user
        role: String!               # Role of the user (e.g., Doctor, Administrator)
        createdAt: String!          # Timestamp when the user was created
        facilities: [Facility]      # Facilities associated with the user
    }

    # Define the Facility type representing a facility
    type Facility {
        id: String!                 # Unique identifier for the facility
        name: String!               # Name of the facility
        createdAt: String!          # Timestamp when the facility was created
        locations: [Location]       # Locations associated with the facility
    }

    # Define the Location type representing a geographical location
    type Location {
        id: String!                 # Unique identifier for the location
        state: String!              # State of the location
        zip: String!                # ZIP code of the location
        address: String!            # Address of the location
        facility: Facility          # Facility associated with the location
        users: [User]               # Users associated with the location
    }

    # Define the Query type representing available queries
    type Query {
        # Query to retrieve a user by their id
        user(id: String!): User
        # Query to retrieve users associated with a location by location id
        usersByLocation(id: String!): Location
    }

    # Define the Mutation type representing available mutations
    type Mutation {
        # Mutation to add a new user
        addUser(
            firstName: String
            lastName: String
            email: String
            role: String
            facilities: [String]
        ): User
        # Mutation to add a new facility
        addFacility(
            name: String
            users: [String]
            locations: [String]
        ): Facility
        # Mutation to add a new location
        addLocation(
            state: String
            zip: String
            address: String
            facility: String
        ): Location
    }
`;

export default Schema;
