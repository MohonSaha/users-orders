# Users Orders Assignment

## Description

This Node.js application manages users and orders. It uses Express, MongoDB, and TypeScript.

## Prerequisites for the project

Before you begin, ensure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- MongoDB (Make sure it's running)

## Installation

1. **Clone the repository:**

   ```bash
   https://github.com/MohonSaha/users-orders.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd users-orders-assignment
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

## Configuration before run the code

1. **Create a `.env` file in the root of the project and add the following configuration:**

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   ```

   Adjust the `PORT` and `MONGODB_URI` values as needed.

## Usage

### Development

To run the application in development mode, use the following command:

     npm run start:dev

## Linting and Formatting

1.  Lint the code:

    ```bash
    npm run lint
    ```

2.  Automatically fix linting issues:

    ```
    npm run lint:fix
    ```

3.  Format code using Prettier:

    ```

    npm run prettier

    ```

4.  Automatically fix formatting issues:

    ```

    npm run prettier:fix

    ```
