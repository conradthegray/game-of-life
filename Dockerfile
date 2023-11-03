# ---- Build Stage ----
FROM node:21-alpine AS build-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy app sources
COPY . .

# Build the app
RUN npm run build

# ---- Serve Stage ----
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build-stage /app/dist .

# Expose port 80 (default HTTP port)
EXPOSE 80
