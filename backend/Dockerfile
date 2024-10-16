# Dockerfile for NestJS app
FROM node:20

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Ensure that the 'dist' folder is generated
RUN ls dist

# Expose the port on which the application listens
EXPOSE 3001

# Start the application
CMD ["node", "dist/main.js"]
