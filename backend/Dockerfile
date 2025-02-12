# Use Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm install

# Install TypeScript globally
RUN npm install -g typescript

# Copy the backend source code properly
COPY ./backend . 

# Compile TypeScript
RUN tsc

# Expose the backend port
EXPOSE 5000

# Start the backend server
CMD ["node", "dist/index.js"]
