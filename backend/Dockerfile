FROM node:20

WORKDIR /app

# Copier les fichiers de dépendances Node.js
COPY package*.json ./
RUN npm install

# Installer Azure CLI
RUN curl -sL https://aka.ms/InstallAzureCLIDeb | bash

# Installer Infracost
RUN curl -fsSL https://raw.githubusercontent.com/infracost/infracost/master/scripts/install.sh | sh

# Ajouter Infracost au PATH
ENV PATH="/usr/local/bin:${PATH}"

# Copier le répertoire terraform-codes dans le conteneur
COPY terraform-codes /terraform-codes

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 3001
RUN az login --service-principal -u "c3231912-9f5f-4888-9c01-a3d7ead408a6" -p "Mj58Q~X4o7xlq6DFlBUWUJt~SsL8WngZ1emrvb-T" --tenant "b5ddb5f6-c713-48e9-a93d-d9fa7d6d6ae8"
# Définir la commande par défaut
CMD ["npm", "run", "start:prod"]

# Vérification de l'installation d'Infracost
RUN infracost --version

