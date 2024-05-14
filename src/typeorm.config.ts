import { DataSource } from "typeorm"; // Importing DataSource from TypeORM for database connection
import "reflect-metadata"; // Importing reflect-metadata for TypeORM
import dotenv from "dotenv"; // Importing dotenv for environment variables

dotenv.config(); // Loading environment variables from .env file

// Creating a new DataSource instance for database connection
const AppDataSource = new DataSource({
    type: "postgres", // Specifying the database type (PostgreSQL)
    host: process.env.DB_HOST, // Database host address obtained from environment variables
    port: Number(process.env.DB_PORT), // Database port obtained from environment variables, converting to a number
    username: process.env.DB_USERNAME, // Database username obtained from environment variables
    password: process.env.DB_PASSWORD, // Database password obtained from environment variables
    database: process.env.DB_DATABASE, // Database name obtained from environment variables
    entities: ["src/entities/**/*.ts"], // Array of entity files to be used by TypeORM
    logging: false, // Disabling logging for database operations (can be set to true for debugging)
    synchronize: true, // Synchronize database schema with entities (ONLY in DEV mode, not suitable for production)
});

export default AppDataSource; // Exporting the created DataSource instance for use in other parts of the application
