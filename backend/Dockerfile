FROM node:20

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci && npm rebuild bcrypt --build-from-source

# Install Azure CLI
RUN curl -sL https://aka.ms/InstallAzureCLIDeb | bash

# Install Infracost
RUN curl -fsSL https://raw.githubusercontent.com/infracost/infracost/master/scripts/install.sh | sh

# Add Infracost to PATH
ENV PATH="/usr/local/bin:${PATH}"

# Copy the application files
COPY . .

# Expose the application port
EXPOSE 3001

# Set the default command to start the application
CMD ["npm", "run", "start:prod"]

# Verify Infracost installation
RUN infracost --version
