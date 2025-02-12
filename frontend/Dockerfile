# Use Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install

# Copy frontend source code
COPY ./frontend .

# Build React App (TypeScript)
RUN npm run build

# Expose the frontend port
EXPOSE 3000

# Start the frontend server
CMD ["npm", "start"]
