# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies (including devDependencies)
COPY package*.json ./
RUN npm install

# Copy the entire project and build the NestJS application
COPY . .
RUN npm run build

# Verify the dist folder contains main.js
RUN ls -la ./dist

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3001

# Start the application
CMD ["npm", "run", "start:prod"]
