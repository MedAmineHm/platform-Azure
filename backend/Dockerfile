# Use Node 20 as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Install Azure CLI
RUN curl -sL https://aka.ms/InstallAzureCLIDeb | bash

# Install Infracost
RUN curl -fsSL https://raw.githubusercontent.com/infracost/infracost/master/scripts/install.sh | sh

# Add Infracost to PATH
ENV PATH="/usr/local/bin:${PATH}"

# Copy the specific directory containing Terraform codes into the container
COPY terraform-codes /app/terraform-codes

# Copy the rest of the application files into the container
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3001

# Optional: Remove sensitive information and Azure CLI login for security
# If login is necessary, use it outside the Dockerfile during runtime or through a secure pipeline process

# Set the default command to start the app in production mode
CMD ["npm", "run", "start:prod"]

# Verification of Infracost installation
RUN infracost --version
