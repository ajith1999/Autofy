# Use the official Node.js image as the base image
FROM node:14 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code to the container
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use a lightweight Nginx image to serve the Angular app
FROM nginx:alpine

# Copy the built Angular app to Nginx's public directory
COPY --from=builder /app/dist/frontend /usr/share/nginx/html

# Expose port 80 to access the Angular app
EXPOSE 80

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
