# Étape 1 : Construction de l'application
FROM node:20 AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances Node.js
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN npm run build

# Étape 2 : Création de l'image de production
FROM node:20

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers construits depuis l'étape de construction
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Installer uniquement les dépendances de production
RUN npm install --only=production

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Définir la commande par défaut
CMD ["node", "dist/main"]
