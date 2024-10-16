# Stage 1: Build the application
FROM node:20 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app /app

# Install Azure CLI
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://aka.ms/InstallAzureCLIDeb | bash && \
    apt-get clean

# Install Infracost
RUN curl -fsSL https://raw.githubusercontent.com/infracost/infracost/master/scripts/install.sh | sh

# Add Infracost to the PATH
ENV PATH="/usr/local/bin:${PATH}"

# Expose the port
EXPOSE 3001

# Command to run the application
CMD ["node", "dist/main"]
