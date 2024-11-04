# Étape 1 : Build
FROM node:20-alpine AS build

WORKDIR /app

# Copier et installer les dépendances de production
COPY package*.json ./
RUN npm install --production

# Copier les fichiers de l'application et compiler le code TypeScript
COPY . .
RUN npm run build

# Étape 2 : Production
FROM node:20-alpine

WORKDIR /app

# Copier uniquement les fichiers nécessaires pour l'exécution
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Installer Infracost et Azure CLI si nécessaire
RUN apk add --no-cache curl \
  && curl -fsSL https://raw.githubusercontent.com/infracost/infracost/master/scripts/install.sh | sh \
  && curl -sL https://aka.ms/InstallAzureCLIDeb | sh

# Exposer le port de l'application et définir la commande de démarrage
EXPOSE 3001
CMD ["node", "dist/main"]
