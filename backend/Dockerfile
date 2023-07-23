# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code to the container
COPY . .

# Expose the port used by your Node.js backend (e.g., 3000)
EXPOSE 3000

# Start the Node.js backend
CMD ["node", "index.js"]
