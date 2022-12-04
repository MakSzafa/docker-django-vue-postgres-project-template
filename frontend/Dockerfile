FROM node:19.2.0

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
RUN npm install

COPY . ./

RUN npm run build
