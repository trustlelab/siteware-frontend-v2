# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the project
RUN npm run build

# Install a static file server
RUN npm install -g serve

# Expose the port that your server will run on (port 5000)
EXPOSE 5000

# Use 'serve' to serve the build files from the 'dist' folder
CMD ["serve", "-s", "dist", "-l", "5000"]
