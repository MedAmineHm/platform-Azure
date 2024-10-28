# Étape 1 : Build
FROM node:20 AS builder

WORKDIR /app

# Copier les fichiers de dépendances Node.js et installer les dépendances
COPY package*.json ./
RUN npm install --production

# Copier le reste des fichiers de l'application
COPY . .

# Étape 2 : Production
FROM node:20-slim AS production

WORKDIR /app

# Copier uniquement les fichiers nécessaires depuis l'étape de build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app .

# Installer Azure CLI
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://aka.ms/InstallAzureCLIDeb | bash && \
    rm -rf /var/lib/apt/lists/*

# Installer Infracost
RUN curl -fsSL https://raw.githubusercontent.com/infracost/infracost/master/scripts/install.sh | sh

# Ajouter Infracost au PATH
ENV PATH="/usr/local/bin:${PATH}"

# Copier le répertoire terraform-codes dans le conteneur
COPY --from=builder /app/terraform-codes /terraform-codes

# Exposer le port sur lequel l'application écoute
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["npm", "run", "start:prod"]

# Vérification de l'installation d'Infracost
RUN infracost --version
