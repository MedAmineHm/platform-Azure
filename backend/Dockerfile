FROM node:20-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Build the NestJS application
COPY . .
RUN npm run build

# Start the application
CMD ["npm", "run", "start:prod"]
