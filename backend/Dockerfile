# Stage 1: Build the app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Create a minimal production image
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
# Install all dependencies first, then prune to production-only
RUN npm install && npm prune --production

# Expose port 3001
EXPOSE 3001

# Command to run the application
CMD ["node", "dist/main"]
