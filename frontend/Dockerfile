# Stage 1: Build the React application
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the React app
FROM nginx:alpine

# Copy the production build from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the port
EXPOSE 3000

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
