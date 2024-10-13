# Siteware Frontend

## Overview

**Siteware Frontend** is the frontend of an AI-powered voice agent platform built using **Vite**, **TypeScript**, and **React**. The project is designed for scalability and ease of use, integrating modern frontend technologies.

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v18 or above)
- **npm** or **yarn**
- **Docker**

### Setup

1.  Clone the repository:
2.  Install dependencies:

    ```
    npm install
    ```

### Step 3: Run the Development Server

To start the development server and enable hot-reloading for local development, use the following command:

```
npm run dev
```

or for **yarn**:

```
yarn dev
```

The application will be available at:

```
http://localhost:5000
```

### Step 4: Build the Project for Production

To create a production-ready build of the project, run:

```
npm run build
```

or for **yarn**:

```
yarn build
```

This will generate the optimized static files in the `dist` folder.

### Step 5: Preview the Production Build

If you'd like to preview the production build locally, you can use the following command:

```
npm run preview
```

or for **yarn**:

```
yarn preview
```

This will start a server to preview the production build at:

```
http://localhost:5000
```

## Docker Setup

### Step 1: Build the Docker Image

To containerize the project, ensure Docker is installed, and then build the Docker image:

```
docker build -t siteware-frontend .
```

### Step 2: Run the Docker Container

After building the Docker image, run the container using the following command:

```
docker run -p 5000:5000 siteware-frontend
```

The application will be available at:

```
http://localhost:5000
```

## Development Tips

- **Linting**: Ensure code consistency and quality by running the linter:

  ```
  npm run lint
  ```

- **Testing**: To run tests, use the following command (if tests are configured):

  ```
  npm run test
  ```

## Accessing the Application in Production

Once deployed, you can access the application on the appropriate server URL.
