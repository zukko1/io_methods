FROM node:16-alpine as base
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/api
COPY package*.json ./

FROM base as start
RUN npm install
COPY . ./
EXPOSE 3200
CMD npm run start