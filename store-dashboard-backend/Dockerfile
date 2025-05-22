# Use a minimal base image
FROM node:20.12.2-bookworm-slim

# Set working directory
WORKDIR /app

# Copy only package files first for better layer caching
COPY package*.json ./

# Install dependencies (only production dependencies)
RUN apt-get update && apt-get upgrade -y \
    && npm install --omit=dev \
    && npm audit fix --force || true \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the rest of the application code
COPY . .

# Expose port (optional, if your app listens on 5000)
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
