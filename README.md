# Node.js Server Project

This is a simple Node.js server using Express framework.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the server in development mode:
   ```bash
   npm run dev
   ```

   Or run in production mode:
   ```bash
   npm start
   ```

3. The server will be running at `http://localhost:3000` by default.

## Project Structure

- `server.js` - Main server file
- `firebaseConfig.js` - Firebase configuration file

## API Endpoints

- **POST /api/users/:name/:age/:gender** - Add a new user to Firebase Realtime Database and return all users
  - Parameters:
    - `name`: User's name
    - `age`: User's age
    - `gender`: User's gender
  - Example: `POST http://localhost:3000/api/users/John/25/Male`

- **GET /api/users** - Retrieve all users from Firebase Realtime Database
  - Example: `GET http://localhost:3000/api/users`

**Note**: The server is configured with CORS headers to allow requests from web applications like React apps running on different origins.

## Dependencies

- Express.js - Web framework for Node.js
- Firebase - For Realtime Database integration
- Nodemon (dev) - Automatically restarts the server during development

## Note

This repository was initialized on GitHub and merged with local project files.
