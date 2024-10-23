# Étape de construction
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and install all dependencies
COPY package*.json ./
RUN npm install  # Installe toutes les dépendances, y compris devDependencies

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Build the NestJS application
COPY . .
RUN npm run build

# Étape finale
FROM node:20-alpine

WORKDIR /app

# Copie uniquement les fichiers nécessaires depuis l'étape de construction
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --production

EXPOSE 3001

# Start the application
CMD ["npm", "run", "start:prod"]
