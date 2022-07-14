FROM node:16-alpine as base
WORKDIR /app
COPY package*.json ./

FROM base as production
RUN yarn install --immutable --immutable-cache --check-cache --silent
COPY . .

FROM base as development
RUN yarn install --silent
COPY . .

FROM base as localhost
RUN yarn install --silent
COPY . .