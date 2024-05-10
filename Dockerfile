# Use Node.js LTS as base image
FROM node:latest as base

# Development stage
FROM base as development

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start-dev"]

# Production stage
FROM base as production

WORKDIR /app

COPY package.json .

RUN npm install --only=production

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
