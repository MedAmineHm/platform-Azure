# Stage 1: Build the app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install  # Installe toutes les dépendances
COPY . .
RUN npm run build  # Compile l'application

# Stage 2: Create a minimal production image
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --only=production  # Installe uniquement les dépendances de production
CMD ["node", "dist/main"]
