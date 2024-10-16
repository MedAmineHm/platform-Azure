# Use the official Node.js image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Azure CLI
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://aka.ms/InstallAzureCLIDeb | bash && \
    apt-get clean

# Install Infracost
RUN curl -fsSL https://raw.githubusercontent.com/infracost/infracost/master/scripts/install.sh | sh

# Add Infracost to the PATH
ENV PATH="/usr/local/bin:${PATH}"

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port on which the application listens
EXPOSE 3001

# Set the command to run your app
CMD ["node", "dist/main"]

# Check Infracost installation
RUN infracost --version
