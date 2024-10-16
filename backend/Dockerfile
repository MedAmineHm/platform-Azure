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

# Installer Azure CLI
RUN curl -sL https://aka.ms/InstallAzureCLIDeb | bash

# Installer Infracost
RUN curl -fsSL https://raw.githubusercontent.com/infracost/infracost/master/scripts/install.sh | sh

# Ajouter Infracost au PATH
ENV PATH="/usr/local/bin:${PATH}"

# Copier les fichiers construits depuis l'étape de construction
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Installer uniquement les dépendances de production
RUN npm install --only=production

# Copier le répertoire terraform-codes dans le conteneur
COPY terraform-codes /terraform-codes

# Exposer le port sur lequel l'application écoute
EXPOSE 3001

# Effectuer la connexion Azure (remplacez les informations d'identification par des variables d'environnement ou des secrets pour la sécurité)
RUN az login --service-principal -u "c3231912-9f5f-4888-9c01-a3d7ead408a6" -p "Mj58Q~X4o7xlq6DFlBUWUJt~SsL8WngZ1emrvb-T" --tenant "b5ddb5f6-c713-48e9-a93d-d9fa7d6d6ae8"

# Définir la commande par défaut
CMD ["npm", "run", "start:prod"]
