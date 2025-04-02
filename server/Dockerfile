# Use an official Node.js runtime as the base image
FROM node:18-slim

# Install Chromium and its dependencies
RUN apt-get update && \
    apt-get install -y chromium && \
    rm -rf /var/lib/apt/lists/*

# Set environment variable for Puppeteer to use Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Set the working directory in the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on (optional if required)
EXPOSE 5000

# Command to run your app
CMD ["node", "server.js"]
