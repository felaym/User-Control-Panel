# User Management App

## Technologies Used
- **Frontend**: React, JSX, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (example URL in `.env`)
- **Package Manager**: Yarn
- **ESLint**: Configuration for React and React Hooks

## Project Structure
```bash
/.yarn (ignored)

# Client-side
/client
  /node_modules (ignored)
  /src
    api.js
    App.jsx
    App.css
    main.jsx
  index.html
  .env (ignored)
  .env.example
  package.json
  vite.config.js

# Server-side
/server
  /node_modules (ignored)
  /controllers
    userController.js
  /models
    userModel.js
  /routes
    userRoutes.js
  .env (ignored)
  .env.example
  package.json
  server.js

# Root files
.gitignore
.pnp.cjs (ignored)
.pnp.loader.mjs (ignored)
eslint.config.js
README.md
package.json (root)
yarn.lock (ignored)

Installation

Clone the repository:

> git clone <repository-url>
> cd <project-folder>

Install dependencies:

> yarn install

This will install all dependencies for both client and server workspaces.

Environment Variables

Create a .env file in both /client and /server directories based on .env.example:

Frontend (/client/.env):

> VITE_API_URL=http://localhost:5000

Backend (/server/.env):

> MONGODB_URI=mongodb://localhost:27017/userdb
> PORT=5000

Running the Project

To start both the frontend and backend simultaneously, run:

> yarn start

This uses concurrently to run:

Frontend: yarn workspace client dev

Backend: yarn workspace server start
