# Frontend Dockerfile
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve to serve the static files
RUN npm install -g serve

# Copy the build output from the build stage
COPY --from=build /app/build .

# Expose port 3000
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", ".", "-l", "3000"]
