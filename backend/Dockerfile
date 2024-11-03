# Stage 1: Build the app
FROM node:20 AS builder
WORKDIR /app
COPY . .          
RUN npm install     # Install all dependencies
RUN npm run build   # Run the build command to create the dist folder

# Stage 2: Run the app
FROM node:20
WORKDIR /app
COPY --from=builder /app/dist ./dist               
COPY --from=builder /app/package*.json ./         
RUN npm install --only=production                  
CMD ["node", "dist/main"]
