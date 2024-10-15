# Étape 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copier uniquement les fichiers nécessaires pour l'installation
COPY package*.json ./

# Installer les dépendances de production uniquement
RUN npm install --legacy-peer-deps --production

# Copier le reste des fichiers pour la build
COPY . .

# Étape 2: Production
FROM node:18-alpine

WORKDIR /app

# Copier uniquement les fichiers nécessaires depuis l'étape précédente
COPY --from=builder /app /app

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
