FROM node:16-alpine as base
WORKDIR /app
COPY package*.json ./

FROM base as production
ENV NODE_ENV=production
RUN npm ci --silent
COPY . .

FROM base as development
FROM base as localhost
ENV NODE_ENV=development
RUN npm install --silent
COPY . .