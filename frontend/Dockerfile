# Étape 1 : Construction de l'application
FROM node:20 AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances Node.js
COPY package*.json ./

# Installer les dépendances avec legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Serveur de production
FROM nginx:alpine

# Copier les fichiers construits vers le répertoire de Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Exposer le port sur lequel Nginx écoute
EXPOSE 3000

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
