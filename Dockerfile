ARG logging=CLOUD_LOGGING_ONLY

# Use the official Node.js image as the base image
FROM node:20.18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN pnpm build

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run the app
CMD ["pnpm", "start"]
