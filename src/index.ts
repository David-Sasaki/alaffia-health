import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";

import Schema from "./schema/schema"; // Import GraphQL schema
import Resolvers from "./resolvers/resolvers"; // Import GraphQL resolvers
import AppDataSource from "./typeorm.config"; // Import data source configuration

export const startServer = async () => {
    // Initialize data source
    await AppDataSource.initialize();

    // Create Express app and HTTP server
    const app = express();
    const httpServer = http.createServer(app);

    // Create Apollo Server instance
    const server = new ApolloServer({
        typeDefs: Schema, // Provide GraphQL schema
        resolvers: Resolvers, // Provide GraphQL resolvers
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], // Add plugin for draining HTTP server
    }) as any;

    // Start Apollo Server
    await server.start();

    // Apply middleware to Express app
    server.applyMiddleware({ app });

    // Define port for HTTP server
    const PORT = 4000;

    // Listen for connections on specified port
    await new Promise<void>((resolve) =>
        httpServer.listen({ port: PORT }, resolve)
    );

    // Print server URL once it's ready
    const url = `http://localhost:${PORT}${server.graphqlPath}`;
    console.log(`Server ready at ${url}`);

    // Return server instance and URL
    return { server, url };
};

startServer().catch(error => {
    console.error("Error starting the server:", error);
});
