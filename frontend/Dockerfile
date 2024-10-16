# Use the official Node.js image
FROM node:18-alpine

# Set environment variable to disable auto-opening browser
ENV BROWSER=none

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose the port on which the application listens
EXPOSE 3000

# Set the command to run your app
CMD ["npm", "start"]
