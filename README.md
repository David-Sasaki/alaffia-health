# GraphQL Server Application

Welcome to the GraphQL Server Application! This application serves as a backend server for managing users, facilities, and locations using GraphQL queries and mutations. It provides a flexible and efficient way to interact with the underlying data model.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Development Environment Setup](#development-environment-setup)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Features

- **GraphQL API**: Provides a flexible API for querying and mutating data.
- **User Management**: Allows for the creation, retrieval, updating, and deletion of users.
- **Facility Management**: Supports CRUD operations for facilities and their associated locations.
- **Location Management**: Manages geographical locations and their associations with facilities.

## Technologies Used

- **Node.js**: JavaScript runtime environment for server-side development.
- **Express**: Web framework for Node.js used for building the server.
- **GraphQL**: Query language for APIs used for defining schema and resolvers.
- **TypeORM**: Object-Relational Mapping (ORM) library for TypeScript and JavaScript used for database interactions.
- **PostgreSQL**: Relational database management system used for data storage.
- **Jest**: Testing framework for JavaScript and TypeScript used for unit testing.
- **Apollo Server**: GraphQL server library used for serving GraphQL APIs.

## Project Structure

The project follows a structured architecture to maintain clarity and organization:

- `src/`: Contains all the source code files.
  - `controllers/`: Contains controller functions for interacting with the database.
  - `entities/`: Contains entity classes representing database tables.
  - `resolvers/`: Contains resolver functions for handling GraphQL queries and mutations.
  - `schema/`: Contains the GraphQL schema definition.
  - `config/`: Contains configuration files for TypeORM, Apollo Server, etc.
  - `index.ts`: Entry point for the application.
- `test/`: Contains unit tests for resolver functions and controllers.

## Development Environment Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/David-Sasaki/alaffia-health.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd alaffia-health
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**:

   - Create a .env file in the root directory.
   - Define environment variables such as database connection details, server port, etc.

5. **Database Configuration**:

   - Configure TypeORM to connect to your PostgreSQL database.
   - Define database entities and relationships in TypeORM configuration files.

6. **Run the Application**:

   ```bash
   npm start
   ```

7. **Testing**:

   - Write unit tests for resolver functions and controllers in the `test/` directory.
   - Run tests using Jest or your preferred testing framework.

   ```bash
   npm test
   ```

8. **Deployment**:

   - Deploy the application to a hosting environment such as Heroku, AWS, or a VPS.
   - Ensure that the database is properly configured and accessible from the deployed environment.

## Usage

- **GraphQL Endpoint**: Access the GraphQL API endpoint at `http://localhost:5000/graphql`.
- **Queries and Mutations**: Use GraphQL queries and mutations to interact with the API.

## Testing

- Write unit tests for resolver functions and controllers in the `test/` directory.
- Run tests using Jest or your preferred testing framework.

## Deployment

- Deploy the application to a hosting environment such as Heroku, AWS, or a VPS.
- Ensure that the database is properly configured and accessible from the deployed environment.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Create a new Pull Request
