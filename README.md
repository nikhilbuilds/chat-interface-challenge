# AI Chat Interface

A modern, intelligent chat interface built with React, TypeScript, and Material-UI that showcases real-time communication, speech recognition, and theme customization.

---

## **Table of Contents**

- [Features](#features)
- [Screenshots](#screenshots)
- [Setup Instructions](#️-setup-instructions)
- [Docker Setup](#-docker-setup)
  - [Docker Configuration](#-docker-configuration)
  - [Dockerfile Examples](#-dockerfile-examples)
- [Architecture Overview](#-architecture-overview)
  - [Frontend](#-frontend)
  - [Backend](#-backend)
- [Implementation Decisions](#-implementation-decisions)
- [Testing Approach](#-testing-approach)
- [Future Enhancements](#-future-enhancements)

---

## **Screenshots**

<img src="/frontend/public/image1.png" >
<img src="/frontend/public/image2.png" >
<img src="/frontend/public/image3.png" >

---

## **Features**

- Real-time chat with AI responses
- Speech-to-text input support
- Theme switching (dark/light mode)
- Quick reply suggestions
- Message history persistence using IndexedDB
- Chat history management (view, delete)
- Multi-language support
- Error handling and loading states

## 🛠️ Setup Instructions

1. Clone the repository:

```bash
git clone [repository-url]
cd chat-interface-challenge
```

2. Install dependencies:

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. Set up environment variables:

```bash
# Frontend (.env)
REACT_APP_API_URL=http://localhost:5000

# Backend (.env)
OPENAI_API_KEY=your_api_key
```

4. Start the development servers:

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm start
```

## 🐳 Docker Setup

1. Build and run using Docker Compose:

```bash
# Build the images
docker-compose build

# Start the services
docker-compose up

# Or build and start in one command
docker-compose up --build

# Run in detached mode
docker-compose up -d
```

2. Access the application:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

3. Stop the containers:

```bash
docker-compose down
```

### Docker Configuration

The project includes separate Dockerfiles for frontend and backend:

```yaml
# docker-compose.yml
services:
  backend:
    build:
      context: .
      dockerfile: backend/Dockerfile
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - PORT=5000
    volumes:
      - ./backend:/app
      - /app/node_modules
    command: npm run dev

  frontend:
    build:
      context: .
      dockerfile: frontend/Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      - REACT_APP_API_URL=http://localhost:5000
    volumes:
      - ./frontend:/app
      - /app/node_modules
    command: npm start
```

### Dockerfile Examples

```dockerfile
# frontend/Dockerfile
FROM node:18
WORKDIR /app
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install
COPY ./frontend .
RUN npm run build
EXPOSE 3000

CMD ["npm", "start"]

# backend/Dockerfile
FROM node:18
WORKDIR /app
COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm install
RUN npm install -g typescript
COPY ./backend .
RUN tsc
EXPOSE 5000
CMD ["node", "dist/index.js"]

```

## 🏗️ Architecture Overview

### Frontend

- **React** with TypeScript for type safety
- **Material-UI** for component library
- **React Context API** for state management
- **IndexedDB** for message persistence
- **WebSocket** for real-time communication
- **Web Speech API** for speech recognition

### Backend

- **Node.js** with Express
- **WebSocket** server for real-time messaging
- **OpenAI API** integration for AI responses

## 💡 Implementation Decisions

1. **State Management**

   - Used React Context API for global state management
   - Separate contexts for chat and theme management
   - Custom hooks for state access and updates

2. **Data Persistence**

   - Used IndexedDB over localStorage for better performance with large datasets
   - Implemented pagination for message history

3. **Real-time Communication**

   - WebSocket for instant message delivery
   - WebSocket API for quick replies

4. **UI/UX**
   - Material-UI for consistent design
   - Dark/light theme support

## 🧪 Testing Approach

1. **Unit Tests**

   - Jest and React Testing Library
   - Component testing with mock data
   - Store and utility function tests

2. **Integration Tests**

   - WebSocket communication
   - IndexedDB operations
   - Theme switching functionality

3. **E2E Tests** (Planned)
   - User flow testing with Cypress
   - Speech recognition testing

## 🚀 Future Enhancements

1. **Performance**

   - Implement lazy loading for message history
   - Add message virtualization for large conversations

2. **Features**

   - Auto complete suggestions
   - Dynamic quick replies based on context
   - Push notifications for AI responses
   - File attachment support
   - Message search functionality
   - User authentication
   - Message encryption
   - HTTP fallback for offline support

3. **Error Handling & Testing**

   - Implement comprehensive ErrorBoundaries
   - Add error recovery mechanisms
   - Improve error logging and monitoring
   - Add more unit test coverage
   - Add integration tests for error scenarios
   - Add E2E tests for critical user flows
   - Add performance testing
   - Add load testing for WebSocket connections
